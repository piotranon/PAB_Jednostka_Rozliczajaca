<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

use Exception;
use PDOException;

use App\Models\Bank;

use App\Services\ClearingHouseService;

class BankController extends Controller
{
    public function postCreate(Request $request)
    {
        try {
            DB::beginTransaction();

            $clearingHouse = new ClearingHouseService();
            $bank = $clearingHouse->createBank($request['BankNo'], $request['name']);

            DB::commit();
            return response()->json(["created" => $bank], 201);
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

    public function putUpdate(Request $request)
    {
        try {
            DB::beginTransaction();

            $request->validate(['BankNo' => 'required|exist:banks|string|min:8|max:8']);

            $bank = Bank::where('bank_number', $request['BankNo']);
            $bank->name = $request['name'];

            DB::commit();
            return response()->json(["created" => $bank], 201);
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

    public function getAll()
    {
        try {
            $bank = Bank::all();
            return response()->json($bank, 200);
        } catch (PDOException $e) {
            return response()->json(['errors' => ['title' => "Database problem", 'detail' => $e->getMessage()]], 500);
        } catch (Exception $e) {
            return response()->json(['errors' => ['title' => $e->getMessage(), 'details' => $e->getTrace()]], 500);
        }
    }

    public function getId($id)
    {
        try {
            $bank = Bank::find($id)->first();
            if (!$bank)
                return response()->json(['errors' => ['title' => 'Invalid bank id', 'detail' => 'Bank identified by id: "' . $id . '" doesn\'t exist in database.']], 422);
            return response()->json($bank->load(['debitedOperations', 'creditedOperations']), 200);
        } catch (PDOException $e) {
            return response()->json(['errors' => ['title' => "Database problem", 'detail' => $e->getMessage()]], 500);
        } catch (Exception $e) {
            return response()->json(['errors' => ['title' => $e->getMessage(), 'details' => $e->getTrace()]], 500);
        }
    }
}
