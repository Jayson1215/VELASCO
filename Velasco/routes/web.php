<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// routes/web.php
Route::get('/', function () {
    return view('welcome'); // or 'home' if you're using a custom view
});
Route::get('/home', function () {
    return view('home'); // or 'welcome' if you're using a custom view
})->where('any', '^(?api)."$');

Route::get('/home', function () {
    return view('home');
});

Route::get('/home', function () {
    return view('home'); // This loads resources/views/home.blade.php
});
