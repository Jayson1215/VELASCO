<?php

use Illuminate\Http\Request;

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

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::get('/profiles', [ProfileController::class, 'index']); // fetch all profiles
Route::post('/profiles', [ProfileController::class, 'store']); // add new profile
Route::put('/profiles/{id}', [ProfileController::class, 'update']);
Route::delete('/profiles/{id}', [ProfileController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
