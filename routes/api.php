<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

    Route::post('/login', function (Request $request) {
        $login = $request->login;
        $password = $request->password;
        $user = User::where('username', $login)->first();
        if ($user && Hash::check($password, $user->password)) {
            return $user->createToken('api token')->plainTextToken;
        }

        return sprintf('%s %s', $login, $password);
    });

