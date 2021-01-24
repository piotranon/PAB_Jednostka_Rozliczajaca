<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Validation\ValidationException;
use Exception;
use PDOException;

use App\Models\Bank;

use App\Services\ClearingHouseService;
use App\Services\OperationService;
use Illuminate\Support\Facades\Validator;

class SessionController extends Controller
{
    public function postData(Request $request)
    {
        try {
            DB::beginTransaction();

            $ClearingHouseService = new ClearingHouseService();
            $OperationService = new OperationService();
            $debitedBank = Bank::firstWhere("bank_number", $request["BankNo"]);

            if (!$debitedBank)
                $debitedBank = $ClearingHouseService->createBank($request['BankNo']);

            $payments = $request['Payments'];
            $total = 0;
            if ($payments) {
                foreach ($payments as $payment) {
                    Validator::make(
                        $payment,
                        [
                            'DebitedAccountNumber' => ['required', 'string', 'size:28', 'regex:/^[P][L]\d{26}$/'],
                            'DebitedNameAndAddress' => 'required|string',
                            'CreditedAccountNumber' => ['required', 'string', 'size:28', 'regex:/^[P][L]\d{26}$/'],
                            'CreditedNameAndAddress' => 'required|string',
                            'Title' => 'required|string',
                            'Amount' => 'required|numeric|min:0'
                        ],
                        [
                            'DebitedAccountNumber.regex' => "Invalid IBAN format in account: " . $payment['DebitedAccountNumber'] . "'",
                            'CreditedAccountNumber.regex' => "Invalid IBAN format in account: '" . $payment['CreditedAccountNumber'] . "'"
                        ]
                    )->validate();

                    $OperationService->createOperation($payment, $debitedBank);

                    $total += $payment['Amount'];
                }

                // Weryfikacja sum całkowitych (iteracja po wszystkich przelewach, podliczenie amount i porównanie z payment sum
                if ($total !== $request['PaymentSum'])
                    throw ValidationException::withMessages(['PaymentSum' => 'PaymentSum :' . $request['PaymentSum'] . ' doesn\'t sum up with amount of all payments:' . $total . '.']);
            }

            $operationsToBank = $OperationService->getOperationsForBank($debitedBank->id);
            $operationsFormated = [];
            $total = 0;

            foreach ($operationsToBank as $operation) {
                $operationFormated = [];
                $operationFormated['DebitedAccountNumber'] = $operation->debited_account_number;
                $operationFormated['DebitedNameAndAddress'] = $operation->debited_name_and_address;
                $operationFormated['CreditedAccountNumber'] = $operation->credited_account_number;
                $operationFormated['CreditedNameAndAddress'] = $operation->credited_name_and_address;
                $operationFormated['Title'] = $operation->title;
                $operationFormated['Amount'] = $operation->amount;
                $total += $operation['amount'];
                $operation->status_id = 2;
                $operation->save();
                array_push($operationsFormated, $operationFormated);
            }

            DB::commit();
            return response()->json(["BankNo" => $debitedBank->bank_number, "PaymentSum" => $total, "Payments" => $operationsFormated]);
        } catch (ValidationException $e) {
            DB::rollback();
            return response()->json(['errors' => ['title' => $e->getMessage(), 'details' => $e->errors()]], 422);
        } catch (PDOException $e) {
            DB::rollback();
            return response()->json(['errors' => ['title' => "Database problem", 'detail' => $e->getMessage()]], 500);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['errors' => ['title' => $e->getMessage(), 'details' => $e->getTrace()]], 500);
        }
    }

    public function testData(Request $request)
    {
        try {
            $ClearingHouseService = new ClearingHouseService();
            $ClearingHouseService->validateBankNumber($request['BankNo']);

            $payments = $request['Payments'];
            $total = 0;
            if ($payments) {
                foreach ($payments as $payment) {
                    Validator::make(
                        $payment,
                        [
                            'DebitedAccountNumber' => ['required', 'string', 'size:28', 'regex:/^[P][L]\d{26}$/'],
                            'DebitedNameAndAddress' => 'required|string',
                            'CreditedAccountNumber' => ['required', 'string', 'size:28', 'regex:/^[P][L]\d{26}$/'],
                            'CreditedNameAndAddress' => 'required|string',
                            'Title' => 'required|string',
                            'Amount' => 'required|numeric|min:0'
                        ],
                        [
                            'DebitedAccountNumber.regex' => "Invalid IBAN format in account: " . $payment['DebitedAccountNumber'] . "'",
                            'CreditedAccountNumber.regex' => "Invalid IBAN format in account: '" . $payment['CreditedAccountNumber'] . "'"
                        ]
                    )->validate();

                    $total += $payment['Amount'];
                }

                // Weryfikacja sum całkowitych (iteracja po wszystkich przelewach, podliczenie amount i porównanie z payment sum
                if ($total !== $request['PaymentSum'])
                    throw ValidationException::withMessages(['PaymentSum' => 'PaymentSum :' . $request['PaymentSum'] . ' doesn\'t sum up with amount of all payments:' . $total . '.']);
            }

            return response()->json(
                [
                    'BankNo' => $request['BankNo'],
                    'PaymentSum' => $request['PaymentSum'],
                    'Payments' =>
                    [
                        [
                            "DebitedAccountNumber" => $request['Payments'][0]['CreditedAccountNumber'],
                            "DebitedNameAndAddress" => $request['Payments'][0]['CreditedNameAndAddress'],
                            "CreditedAccountNumber" => $request['Payments'][0]['DebitedAccountNumber'],
                            "CreditedNameAndAddress" => $request['Payments'][0]['DebitedNameAndAddress'],
                            "Title" => $request['Payments'][0]['Title'],
                            "Amount" => $request['Payments'][0]['Amount'],
                        ]
                    ]
                ]
            );
        } catch (ValidationException $e) {
            return response()->json(['errors' => ['title' => $e->getMessage(), 'details' => $e->errors()]], 422);
        } catch (Exception $e) {
            return response()->json(['errors' => ['title' => $e->getMessage(), 'details' => $e->getTrace()]], 500);
        }
    }
}
