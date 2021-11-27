<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Responses\ConsultResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $login = $request->login;
        $password = $request->password;
        $user = User::where('username', $login)->first();
        if ($user && Hash::check($password, $user->password)) {
            $token = $user->createToken('api token')->plainTextToken;
            $result = [
                'user' => $user->toArray(),
                'token' => $token
            ];
            $response = new ConsultResponse($result);

            return response()->json($response->response());
        }

        return response()->json((new ConsultResponse('', false))->response());
    }

    public function forgotPasswordEmail(Request $request, ): JsonResponse
    {
    }
}
