<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BankController;
use App\Http\Controllers\OperationController;
use App\Http\Controllers\SessionController;
use App\Services\ClearingHouseService;
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

Route::get('/operations', [OperationController::class, 'getAll']);
Route::get('/operations/{id}', [OperationController::class, 'getId']);


Route::post('/banks', [BankController::class, 'postCreate']);
Route::get('/banks', [BankController::class, 'getAll']);
Route::get('/banks/{id}', [BankController::class, 'getId']);

Route::post('/session', [SessionController::class, 'postData']);

// Route::post('/session', [BankController::class, 'postSession']);
