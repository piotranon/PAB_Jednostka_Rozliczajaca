<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;

use Illuminate\Support\Facades\Validator;

use App\Models\Bank;
use App\Models\Operation;

class ClearingHouseService
{

    public function createBank($bankNumber, $name = NULL)
    {
        Validator::make(['bank_number' => $bankNumber], ['bank_number' => 'required|unique:banks|string|min:8|max:8'])->validate();

        $this->validateBankNumber($bankNumber);
        $bankAccountNumber = $this->generateAccountNumberFromBankNumber($bankNumber);

        $bank = new Bank();
        if ($name !== NULL) {
            Validator::make(['name' => $name], ['name' => 'string'])->validate();
            $bank->name = $name;
        }
        // bbbbbbbb
        $bank->bank_number = $bankNumber;
        // bbbbbbbb 0000 0000 0000 0000
        $bank->bank_account_number = $bankAccountNumber;
        $bank->save();

        return $bank;
    }


    /**
     * Verify that bank number is valid with standards for PL
     *      
     * throws ValidationException with message if isn't
     * 
     * @param string $bankNumber
     * 
     * @return void
     */
    public function validateBankNumber($bankNumber)
    {

        if (strlen($bankNumber) != 8)
            throw ValidationException::withMessages(['bank_number' => 'Bank Number is too long.']);
        // return false;

        if (preg_match('([a-zA-Z])', $bankNumber))
            throw ValidationException::withMessages(['bank_number' => 'Bank Number cannot contains letters.']);
        // return false;

        if ($bankNumber[6] == 0)
            return;

        $sum = 3 * intval($bankNumber[0]) +
            9 * intval($bankNumber[1]) +
            7 * intval($bankNumber[2]) +
            1 * intval($bankNumber[3]) +
            3 * intval($bankNumber[4]) +
            9 * intval($bankNumber[5]) +
            7 * intval($bankNumber[6]);

        $mod10 = $sum % 10;

        if ($mod10 != 0)
            $mod10 = 10 - $mod10;

        if ($mod10 !== intval($bankNumber[7]))
            throw ValidationException::withMessages(['bank_number' => 'Bank Number controll sum isn\'t correct.']);
    }

    public function generateAccountNumberFromBankNumber($bankNumber)
    {
        $checkSum = 98 - intval(bcmod($this->innerValidateAccountNumber("PL00" . $bankNumber . "0000000000000000"), "97"));

        if ($checkSum < 10) {
            $checkSum = "0" . $checkSum;
        }

        return "PL" . $checkSum . $bankNumber . "0000000000000000";
    }

    private function innerValidateAccountNumber($accountNumber)
    {
        $accountNumber = substr($accountNumber, 4) . "2521" . substr($accountNumber, 2, 2);
        return $accountNumber;
    }
}
