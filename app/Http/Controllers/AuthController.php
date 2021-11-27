<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Responses\ApiResponse;
use App\Responses\ConsultResponse;
use App\Services\Auth\CanRedefine;
use App\Services\Auth\ForgotPasswordEmail;
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

    public function forgotPasswordEmail(Request $request, ForgotPasswordEmail $forgot): JsonResponse
    {
        try {
            $email = (string) $request->request->get('email');
            $forgot->sendEmail($email);
            $response = 'link enviado para seu email';
        } catch (\Exception) {
            $response = 'link enviado para seu email';
        }

        return response()->json((new ApiResponse($response, true))->response());
    }

    public function canRedifineForgottenPassword(Request $request, CanRedefine $canRedine): JsonResponse
    {
        try {
            $userId = $request->query->getInt('u');
            $hash = (string) $request->query->get('f');
            $can = $canRedine->can($userId, $hash);

            return response()->json((new ApiResponse('', $can))->response());
        } catch (\Exception) {
            return response()->json(ConsultResponse::fail('')->response());
        }
    }
}
