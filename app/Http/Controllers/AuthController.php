<?php

namespace App\Http\Controllers;

use App\Models\BlockUser;
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
        $email = (string) $request->request->get('email');
        $forgot->sendEmail($email);
        $response = 'link enviado para seu email';

        return response()->json((new ApiResponse($response, true))->response());
    }

    public function canRedifineForgottenPassword(Request $request, CanRedefine $canRedine): JsonResponse
    {
        $userId = $request->query->getInt('u');
        $hash = (string) $request->query->get('f');
        $can = $canRedine->can($userId, $hash);

        return response()->json((new ApiResponse('', $can))->response());
    }

    public function userIsBlocked(Request $request): JsonResponse
    {
        $user = $request->user();
        $blocked = $user->isBlocked();
        $blockedResponse = [
            'isBlocked' => $blocked,
            'until' => null
        ];
        if ($blocked) {
            $blockedResponse['until'] = BlockUser::where('user_id', $user->id)->first()->block_until_date;
        }
        return response()->json($blockedResponse);
    }
}
