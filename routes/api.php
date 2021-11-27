<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\UserController;
use App\Responses\ConsultResponse;
use Illuminate\Http\Request;
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

Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPasswordEmail']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/confirmEmail', [UserController::class, 'sendConfirmEmail']);

Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('verifyEmailApi')->group(function () {
        Route::prefix('user')->group(function () {
            Route::get('/', function (Request $request) {
                $user = $request->user();
                $response = new ConsultResponse($user->id, true);
                return response()->json($response->response());
            });
            Route::post('register', [UserController::class, 'register']);
        });

        Route::prefix('book')->group(function () {
            Route::get('/', [LibraryController::class, 'books']);
            Route::get('/books-created-by', [LibraryController::class, 'booksCreatedBy']);
            Route::get('/{bookId}', [LibraryController::class, 'bookById']);

            Route::post('add', [LibraryController::class, 'addBook']);

            Route::put('/{bookId}', [LibraryController::class, 'editBookById']);

            Route::delete('/{bookId}', [LibraryController::class, 'removeBook']);
        });
    });
});
