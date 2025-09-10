<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

// API routes
Route::get('/profiles', [ProfileController::class, 'index']);   // Get all profiles
Route::post('/profiles', [ProfileController::class, 'store']);  // Create a new profile

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
