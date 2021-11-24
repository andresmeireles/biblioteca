<?php

namespace App\Http\Controllers;

use App\Responses\ConsultResponse;
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

    // TODO essa classe deverá ser atualizada quando o frontend for feito, junto com seus testes.
    public function confirmUserEmail(Request $request, ConfirmEmail $confirmEmail): string
    {
        $userId = (int) $request->query->getDigits('u');
        $hash = $request->query->getAlnum('h');
        try {
            $user = $confirmEmail->confim($userId, $hash);
            return sprintf('email %s confirmado com sucesso', $user->email);
        } catch (\Exception) {
            return 'usuario não existe';
        }
    }
}
