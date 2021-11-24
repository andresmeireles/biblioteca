<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ConfirmEmail
{
    public function confim(int $userId, string $hash): User
    {
        $user = User::findOrFail($userId);
        if (Hash::check($user->username, $hash)) {
            $user->email_verified_at = now();
            $user->update();

            return $user;
        }
        throw new \InvalidArgumentException('falha na validação');
    }
}
