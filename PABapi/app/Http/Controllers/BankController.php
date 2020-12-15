<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

use Exception;


use App\Models\Bank;
use App\Models\Operation;
use App\Models\Account;
use Illuminate\Support\Facades\Redis;

class BankController extends Controller
{
    public function getAllBanks()
    {
        $Bank = Bank::all();
        return response()->json($Bank, 200);
    }

    public function getBank($id)
    {
        $Bank = Bank::firstOrFail('id', $id);
        return response()->json($Bank->with('accountAll')->first(), 200);
    }

    public function postBank(Request $request)
    {
        // $request->validate("bank_number")

        $Bank = new Bank(["bank_number" => $request['Bank_Number']]);
        $Bank->save();

        $account = new Account(["account_number" => $this->generateBankAccountNumber($request['Bank_Number'])]);
        $account->bank_id = $Bank->id;
        $account->save();

        return response()->json($Bank->with('accountAll')->first(), 200);
    }

    public function postSession(Request $request)
    {
        $BankRequest = $request['Bank_Info'];

        // ============================== 1 =============================
        $Bank = Bank::where('bank_number', $BankRequest['Bank_Number'])->first();
        // Weryfikacja rachunku
        // return response()->json(['good' => $this->verifyBankAccountNumber($BankRequest['Bank_Number'])], 300);

        if ($Bank === null) {
            if ($this->verifyBankAccountNumber($BankRequest['Bank_Number'])) {
                $Bank = new Bank(["bank_number" => $BankRequest['Bank_Number']]);
                $Bank->save();
                $account = new Account(["account_number" => $this->generateBankAccountNumber($BankRequest['Bank_Number'])]);
                $account->bank_id = $Bank->id;
                $account->save();
                $Bank = Bank::where('bank_number', $BankRequest['Bank_Number'])->with('accountAll')->first();
            } else
                return response()->json(['errors' => ['message' => 'Invalid Bank_Number Control Sum or Invalid Bank_Number.']], 422);
        }
        // return response()->json(['good' => $Bank->accountAll], 300);

        // ============================== 2 =============================

        $OutgoingTransfers = $request["Outgoing_Transfers"];
        $Outgoing_Incorrect_Transfers = $request["Outgoing_Incorrect_Transfers"];

        if ($BankRequest["Total_Transfer_Amount"] !== $OutgoingTransfers["Transfers_Amount"] + $Outgoing_Incorrect_Transfers["Transfers_Amount"])
            return response()->json(["error" => ["message" => "Total_Transfer_Amount is not equal to Transfers_Amount sum of OutgoingTransfers and Outgoing_Incorrect_Transfers."]], 422);


        // ============================== 3 =============================

        $Total  = 0;
        foreach ($OutgoingTransfers["Transfers"] as $Transfer) {
            $Total += $Transfer['Transfer_Amount'];
        }
        if ($Total != $OutgoingTransfers["Transfers_Amount"])
            return response()->json(["error" => ["message" => "Total_Transfer_Amount is not equal to Transfers_Amount sum of OutgoingTransfers."]], 422);

        // ============================== 4 =============================

        $Total_Incorrect = 0;
        foreach ($Outgoing_Incorrect_Transfers["Transfers"] as $Transfer) {
            $Total_Incorrect += $Transfer["Transfer_Amount"];
        }

        if ($Total_Incorrect != $Outgoing_Incorrect_Transfers["Transfers_Amount"])
            return response()->json(["error" => ["message" => "Total_Transfer_Amount is not equal to Transfers_Amount sum of OutgoingIncorrectTransfers."]], 422);

        // ============================== 5 =============================

        foreach ($OutgoingTransfers["Transfers"] as $Transfer) {
            if (strcmp(substr(str_replace(' ', '', $Transfer["Payer"]["Account_Number"]), 2, 8), $Bank["bank_number"]) != 0)
                return response()->json(["error" => ["message" => "Payer Account_Number Bank is not equal to Bank_Number"]], 422);
            if (!$this->verifyTransferAccountNumber($Transfer["Payer"]["Account_Number"]))
                return response()->json(["error" => ["message" => "Payer Account_Number is invalid"]], 422);
            if (Bank::where(substr($Transfer["Recipient"]["Account_Number"], 2, 8)) === null)
                return response()->json(["error" => ["message" => "Recipient Bank does not exists in system"]], 422);
            if (!$this->verifyTransferAccountNumber($Transfer["Recipient"]["Account_Number"]))
                return response()->json(["error" => ["message" => "Recipient Account_Number is invalid"]], 422);
        }

        // ============================== 6 =============================

        foreach ($OutgoingTransfers["Transfers"] as $Transfer) {
            $Operation = new Operation();
            $Operation->payer_account_number = $Transfer['Payer']['Account_Number'];
            $Operation->recipient_account_number = $Transfer['Recipient']['Account_Number'];
            $Operation->amount = $Transfer['Transfer_Amount'];
            $Operation->type = 1;   // operacja obciazenia
            $Operation->status_id = 1; // Ustawiamy status 'zapisano'
            $Operation->account_id = $Bank->account->id;
            $Operation->save();

            $RecipientBank = Bank::where('bank_number', substr(str_replace(' ', '', $Transfer['Recipient']['Account_Number']), 2, 8))->with('accountAll')->first();

            $Operation2 = new Operation();
            $Operation2->payer_account_number = $Transfer['Payer']['Account_Number'];
            $Operation2->recipient_account_number = $Transfer['Recipient']['Account_Number'];
            $Operation2->amount = $Transfer['Transfer_Amount'];
            $Operation2->type = 2;   // operacja uznania
            $Operation2->status_id = 1; // Ustawiamy status 'zapisano'
            $Operation2->account_id = $RecipientBank->accountAll->id;
            $Operation2->save();
        }


        // ============================== 7 =============================
        // $xd = $Bank->accountAll->operations->where('type', 2);

        foreach ($Outgoing_Incorrect_Transfers["Transfers"] as $IncorrectTransfer) {
            $Operation = $Bank->accountAll->operations
                ->where('type', 2)
                ->where('payer_account_number', $IncorrectTransfer["Payer"]["Account_Number"])
                ->where('recipient_account_number', $IncorrectTransfer["Recipient"]["Account_Number"])
                ->where('amount', $IncorrectTransfer["Transfer_Amount"]);
            return response()->json($Operation, 300);
            $Operation->status_id = 3;
            $Operation->save();

            $BankIncorrectTransfer = Bank::where('bank_number', substr($IncorrectTransfer['Payer']['Account_Number'], 2, 8))->with('accountAll')->first();

            $Operation = $BankIncorrectTransfer->accountAll->operations
                ->where('type', 1)
                ->where('payer_account_number', $IncorrectTransfer["Payer"]["Account_Number"])
                ->where('recipient_account_number', $IncorrectTransfer["Recipient"]["Account_Number"])
                ->where('amount', $IncorrectTransfer["Transfer_Amount"]);
            $Operation->status_id = 3;
            $Operation->save();
        };

        // ============================== 8 =============================

        // operations to Bank
        $Total = 0;
        $OperationsToBank = $Bank->accountAll->operations->where('status_id', 1)->where('type', 2);
        foreach ($OperationsToBank as $Operation) {
            $Total += $Operation->amount;
            $Operation->status_id = 2;
            $Operation->save();
        }

        // operation returned to Bank
        $Total_Incorrect = 0;
        $OperationsToBankInvalid = $Bank->accountAll->operations->where('status_id', 3)->where('type', 1);
        foreach ($OperationsToBankInvalid as $Operation) {
            $Total_Incorrect += $Operation->amount;
            $Operation->status_id = 4;
            $Operation->save();
        }
        // ============================== 9 =============================

        $Total_Transfer_Amount = $Total + $Total_Incorrect;

        // ============================== 10 ============================

        return response()->json([
            "Total_Transfer_Amount" => $Total_Transfer_Amount,
            "Incoming_Transfers" => [
                "Transfers_Amount" => $Total,
                "Transfers" => $OperationsToBank
            ],
            "Incoming_Incorrect_Transfers" => [
                "Transfers_Amount" => $Total_Incorrect,
                "Transfers" => $OperationsToBankInvalid
            ]
        ], 200);
    }

    /**
     * Verify that bank account number is valid with standards for bank account number
     * 
     * @param mixed $accountNumber
     * 
     * @return bool
     */
    private function verifyBankAccountNumber($accountNumber)
    {
        $accountNumber = str_replace(" ", "", $accountNumber);

        if (strlen($accountNumber) != 8)
            return false;

        if (preg_match('([a-zA-Z])', $accountNumber))
            return false;

        $sum = 3 * intval($accountNumber[0]) +
            9 * intval($accountNumber[1]) +
            7 * intval($accountNumber[2]) +
            1 * intval($accountNumber[3]) +
            3 * intval($accountNumber[4]) +
            9 * intval($accountNumber[5]) +
            7 * intval($accountNumber[6]) +
            1 * intval($accountNumber[7]);

        if ($sum % 10 == 0)
            return true;

        return false;
    }


    /**
     * Verify if account number is valid, checks control sum of account number
     * algorithm: https://romek.info/ut/banki.html
     * 
     * @param mixed $accountNumber
     * 
     * @return bool
     */
    private function verifyTransferAccountNumber($accountNumber)
    {
        $accountNumber = strtoupper(str_replace(" ", "", $accountNumber));

        if (substr($accountNumber, 0, 2) !== "PL")
            $accountNumber = "PL" . $accountNumber;

        $accountCanBeValid = bcmod($this->innerValidateAccountNumber($accountNumber), "97") == 1;

        if ($accountCanBeValid) {

            $checkSumToVerify = $accountNumber[2] . $accountNumber[3];

            $accountNumber[2] = "0";
            $accountNumber[3] = "0";

            $checkSum = intval(98 - bcmod($this->innerValidateAccountNumber($accountNumber), "97"));

            if ($checkSum < 10)
                $checkSum = '0' . strval($checkSum);

            if ($checkSum == $checkSumToVerify)
                return true;
            return false;
        } else
            return false;
    }

    private function innerValidateAccountNumber($accountNumber)
    {
        $accountNumber = substr($accountNumber, 4) . "2521" . substr($accountNumber, 2, 2);
        return $accountNumber;
    }

    /**
     * Verify if RecipientAccountNumber is valid with bank account standards
     * Verify if Recipient Bank exist in our database
     * 
     * @param mixed $clientAccountNumber
     * 
     * @return bool
     */
    private function verifyRecipientAccountNumber($clientAccountNumber)
    {
        $clientAccountNumber = str_replace(" ", "", $clientAccountNumber);
    }

    /**
     * Verify if bankAccountNumber is in database
     * 
     * @param mixed $bankAccountNumber
     * 
     * @return bool
     */
    private function verifyBankExistInOurSystem($bankAccountNumber)
    {
        $bank = Bank::firstWhere('account_number', $bankAccountNumber);
        if ($bank !== null)
            return true;
        return false;
    }

    private function generateBankAccountNumber($bankAccountNumber)
    {
        $bankAccount = "PL" . $bankAccountNumber . "0000000000000000";

        $controllSum = bcmod($this->innerValidateAccountNumber($bankAccountNumber), "97");

        return $controllSum . $bankAccountNumber . "0000000000000000";
    }
}
