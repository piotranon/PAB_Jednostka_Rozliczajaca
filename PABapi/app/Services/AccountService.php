<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;


class AccountService
{
    /**
     * Verify if account number is valid, checks control sum of account number
     * algorithm: https://romek.info/ut/banki.html
     * 
     * @param mixed $accountNumber
     * 
     * @return bool
     */
    public function verifyAccountNumber($accountNumber)
    {
        $accountCanBeValid = bcmod($this->innerValidateAccountNumber($accountNumber), "97") == 1;

        if ($accountCanBeValid) {
            $checkSumToVerify = $accountNumber[2] . $accountNumber[3];
            $accountNumber[2] = $accountNumber[3] = "0";

            $checkSum = intval(98 - bcmod($this->innerValidateAccountNumber($accountNumber), "97"));
            if ($checkSum < 10)
                $checkSum = '0' . strval($checkSum);

            if ($checkSum == $checkSumToVerify)
                return true;
        }
        return false;
    }

    public function innerValidateAccountNumber($accountNumber)
    {
        $accountNumber = substr($accountNumber, 4) . "2521" . substr($accountNumber, 2, 2);
        return $accountNumber;
    }
}
