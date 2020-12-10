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

Route::post('/session', [BankController::class, 'postSession']);
Route::get('/', [BankController::class, 'getAllBanks']);
Route::get('/{bankNumber}', [BankController::class, 'getBank']);
Route::post('/add', [BankController::class, 'postBank']);
