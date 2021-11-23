<?php

namespace App\Http\Controllers;

use App\Responses\ConsultResponse;
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
}
