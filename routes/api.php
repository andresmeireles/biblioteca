<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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
Route::get('/verifyEmail', [UserController::class, 'verifyUserEmail']);
Route::get('/changeForgotenPassword', [UserController::class, 'changePasswordWhenForgotten']);
Route::get('/canRedefineForgotPassword', [AuthController::class, 'canRedifineForgottenPassword']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPasswordEmail']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/confirmEmail', [UserController::class, 'sendConfirmEmail']);
Route::post('/changeForgottenPassword', [UserController::class, 'changeForgottenPassword']);

Route::get('/user/blocked', [AuthController::class, 'userIsBlocked'])->middleware('auth:sanctum');

Route::middleware([ 'auth:sanctum', 'userIsBlock', 'verifyEmailApi' ])->group(function () {
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'getUser'])->withoutMiddleware('userIsBlock');
        Route::post('register', [UserController::class, 'register']);
    });

    Route::prefix('book')->group(function () {
        Route::get('/', [LibraryController::class, 'books']);
        Route::get('/batch', [LibraryController::class, 'addBookBatch']);
        Route::get('/book-with-amount', [LibraryController::class, 'booksWithAmount']);
        Route::get('/books-created-by', [LibraryController::class, 'booksCreatedBy']);
        Route::get('/{bookId}', [LibraryController::class, 'bookById']);
        Route::get('/borrow/user', [LibraryController::class, 'borrowBookByUser']);
        Route::get('/borrow/non-finished', [LibraryController::class, 'nonFinishedBorrows'])
                ->middleware('hasPermission:borrow');

        Route::post('add', [LibraryController::class, 'addBook']);
        Route::post('borrow', [LibraryController::class, 'borrow']);
        Route::post('borrow/return', [LibraryController::class, 'returnBorrow'])
                ->middleware('hasPermission:borrow');

        Route::put('/{bookId}', [LibraryController::class, 'editBookById']);
        Route::put('/borrow/approve', [LibraryController::class, 'setApprove'])
                ->middleware('hasPermission:borrow');

        Route::delete('/{bookId}', [LibraryController::class, 'removeBook']);
    });
});
