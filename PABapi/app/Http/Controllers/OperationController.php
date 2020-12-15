<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operation;

class OperationController extends Controller
{
    public function getAllOperations()
    {
        $Transfers = Operation::all();
        return response()->json($Transfers->load(['status', 'account']), 200);
    }
}
