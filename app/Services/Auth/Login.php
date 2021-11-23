<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Interfaces\ApiResponseInterface;
use App\Models\User;
use App\Responses\ConsultResponse;
use Hash;

class Login
{
    public function userToken(string $login, string $password): ApiResponseInterface
    {
        $userLogin = $this->login($login, $password);
        if ($userLogin->hasPermissionTo('admin')) {
            return new ConsultResponse($userLogin->createToken('api')->plainTextToken, true);
        }
        if ($userLogin->email_verified_at === null) {
            return new ConsultResponse(sprintf('para continuar verifique confirme seu email %s', $userLogin->email), false);
        }

        return new ConsultResponse($userLogin->createToken('api')->plainTextToken);
    }

    private function login(string $login, string $password): User
    {
        $user = User::where('username', $login)->first();
        if ($user && Hash::check($password, $user->password)) {
            return $user;
        }

        throw new \InvalidArgumentException('senha ou usuário incorreto');
    }
}
