<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operation;

use Exception;
use PDOException;

class OperationController extends Controller
{
    public function getAll()
    {
        try {
            $transfers = Operation::all();
            return response()->json($transfers->makeHidden(['debited_account_number', 'debited_name_and_address', 'credited_account_number', 'credited_name_and_address', 'created_at', 'updated_at', 'title'])->load(['status']), 200);
        } catch (PDOException $e) {
            return response()->json(['errors' => ['title' => "Database problem", 'detail' => $e->getMessage()]], 500);
        } catch (Exception $e) {
            return response()->json(['errors' => ['title' => $e->getMessage(), 'details' => $e->getTrace()]], 500);
        }
    }

    public function getId($id)
    {
        try {
            $transfer = Operation::find($id);
            if (!$transfer)
                return response()->json(['errors' => ['title' => 'Invalid bank id', 'detail' => 'Operation identified by id: "' . $id . '" doesn\'t exist in database.']], 422);
            return response()->json($transfer->load(['status', 'debitedBank', 'creditedBank']), 200);
        } catch (PDOException $e) {
            return response()->json(['errors' => ['title' => "Database problem", 'detail' => $e->getMessage()]], 500);
        } catch (Exception $e) {
            return response()->json(['errors' => ['title' => $e->getMessage(), 'details' => $e->getTrace()]], 500);
        }
    }
}
