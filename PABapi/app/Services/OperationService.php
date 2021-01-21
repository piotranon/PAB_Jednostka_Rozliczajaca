<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;

use App\Models\Bank;
use App\Models\Operation;

class OperationService
{
    public function createOperation($operation, $debitedBank)
    {
        $clearingHouseService = new ClearingHouseService();
        $accountService = new AccountService();

        // $debitedBank = Bank::firstWhere('bank_number', substr($operation['DebitedAccountNumber'], 4, 8));
        $creditedBank = Bank::firstWhere('bank_number', substr($operation['CreditedAccountNumber'], 4, 8));

        // weryfikacja czy istnieje bank odbiorcy jesli nie utworz
        if (!$creditedBank)
            $creditedBank = $clearingHouseService->createBank(substr($operation['CreditedAccountNumber'], 4, 8));


        // Weryfikacja czy numer konta banku nadawcy zgadza się z numerem konta z którego wykonano przelew
        if (strcmp(substr(
            $operation['DebitedAccountNumber'],
            4,
            8
        ), $debitedBank->bank_number) !== 0)
            return response()->json(['errors' => ['title' => 'Invalid DebitedAccountNumber', 'details' => 'DebitedAccountNumber :\'' . $operation['DebitedAccountNumber'] . '\' does not match bank number from which was send.']], 422);

        // Weryfikacja sum kontrolnych numeru konta odbiorcy
        if (!$accountService->verifyAccountNumber($operation['CreditedAccountNumber']))
            throw ValidationException::withMessages(['CreditedAccountNumber' => 'CreditedAccountNumber isn\'t valid: \'' . $operation['CreditedAccountNumber'] . '\'.']);

        // Weryfikacja sum kontrolnych numeru konta nadawcy
        if (!$accountService->verifyAccountNumber($operation['DebitedAccountNumber']))
            throw ValidationException::withMessages(['DebitedAccountNumber' => 'DebitedAccountNumber isn\'t valid: \'' . $operation['DebitedAccountNumber'] . '\'.']);

        $operationObject = new Operation();
        $operationObject->debited_bank_id = $debitedBank->id;
        $operationObject->credited_bank_id = $creditedBank->id;
        $operationObject->debited_account_number = $operation['DebitedAccountNumber'];
        $operationObject->debited_name_and_address = $operation['DebitedNameAndAddress'];
        $operationObject->credited_account_number = $operation['CreditedAccountNumber'];
        $operationObject->credited_name_and_address = $operation['CreditedNameAndAddress'];
        $operationObject->title = $operation['Title'];
        $operationObject->amount = $operation['Amount'];
        $operationObject->status_id = 1;

        $operationObject->save();
    }

    public function getOperationsForBank($bankId)
    {
        return $operations = Operation::where('credited_bank_id', $bankId)->where('status_id', 1)->get();
    }
}
