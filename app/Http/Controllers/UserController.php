<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Responses\ApiResponse;
use App\Responses\ConsultResponse;
use App\Services\User\ChangeForgottenPassword;
use App\Services\User\ConfirmEmail;
use App\Services\User\CreateNewUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request, CreateNewUser $createNewUser): JsonResponse
    {
        try {
            $data = $request->request->all();
            $user = $createNewUser->regularUser($data);

            $response = new ConsultResponse($user);

            return response()->json($response->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }

    public function sendConfirmEmail(Request $request, CreateNewUser $newUser): JsonResponse
    {
        try {
            $user = User::where('username', $request->request->get('username'))->first();
            $newUser->sendConfirmationEmail($user);
            $responseMessage = 'email de confirmação enviado!';
        } catch (\Exception $err) {
            $responseMessage = $err->getMessage();
        }

        return response()->json((new ApiResponse($responseMessage, true))->response());
    }

    public function verifyUserEmail(Request $request, ConfirmEmail $confirmEmail): JsonResponse
    {
        $userId = (int) $request->query->getDigits('u');
        $hash = $request->query->getAlnum('h');
        try {
            $user = $confirmEmail->confim($userId, $hash);
            $authUser = [
                'user' => $user,
                'token' => $user->createToken('api')->plainTextToken
            ];
            $response = new ConsultResponse($authUser, true);
        } catch (\Exception $err) {
            $response = new ApiResponse($err->getMessage(), false);
        }

        return response()->json($response->response());
    }

    public function changeForgottenPassword(Request $request, ChangeForgottenPassword $change): JsonResponse
    {
        $query = $request->query;
        $req = $request->request->all();
        $user = $query->getInt('u');
        $hash = (string) $query->get('f');
        try {
            $changePassword = $change->change($user, $hash, $req);
            $response = new ApiResponse('senha trocada com sucesso', $changePassword);

            return response()->json($response->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }
}
