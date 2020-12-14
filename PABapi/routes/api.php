<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BankController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/operations', [BankController::class, 'getAllOperations']);

Route::get('/banks', [BankController::class, 'getAllBanks']);
Route::get('/banks/{id}', [BankController::class, 'getBank']);
Route::post('/banks/add', [BankController::class, 'postBank']);
Route::post('/banks/session', [BankController::class, 'postSession']);
