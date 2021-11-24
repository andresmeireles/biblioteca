<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Models\User;

class ConfirmEmail
{
    public function confim(int $userId, string $hash): User
    {
        $user = User::findOrFail($userId);
        $expectedHash = str_rot13(sprintf('%s%s', $user->username, $user->created_at->getTimestamp()));
        if ($user->email_verified_at !== null) {
            throw new \InvalidArgumentException('usuário já está com o email verificado');
        }
        if ($expectedHash === $hash) {
            $user->email_verified_at = now();
            $user->update();

            return $user;
        }
        throw new \InvalidArgumentException('falha na validação');
    }
}
