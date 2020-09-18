<?php

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

//Route::prefix('admin')->group(function() {
//    Route::get('/', 'AdminController@index');
//});
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware('VueLaravelBridgeMiddleware')->group(function () {
        Route::get('/', 'HomeController@index');
        Route::get('/demo', 'HomeController@demo');
    });
    Route::prefix('admin')->middleware('web')->group(function () {

});
