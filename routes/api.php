<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\LinkController;

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
Route::get('/user', function(Request $request) {
    return Auth::user();
})->middleware('auth:sanctum');
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [UserController::class, 'doLogout'])->name('user.doLogout');
    Route::post('/links', [LinkController::class, 'doGetLinks'])->name('links.get');
    Route::post('/shorten_link', [LinkController::class, 'doShortenLink'])->name('links.shorten');
    Route::post('/edit_link', [LinkController::class, 'updateOriginURL'])->name('links.update');
    Route::post('/delete_link', [LinkController::class, 'deleteURL'])->name('links.delete');
});
Route::post('/register', [UserController::class, 'doRegister'])->name('user.doRegister');
Route::post('/login', [UserController::class, 'doLogin'])->name('user.doLogin');
Route::post('/origin_url', [LinkController::class, 'doGetOrigin'])->name('links.getOrigin');
