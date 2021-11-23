<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use App\Responses\ConsultResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request, CreateNewUser $createNewUser): JsonResponse
    {
        try {
            $data = $request->request->all();
            $createdUser = $createNewUser->create($data);
            $result = [
                'user' => $createdUser->toArray(),
                'token' => $createdUser->createToken('api')->plainTextToken
            ];
            $response = new ConsultResponse($result);

            return response()->json($response->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }
}
