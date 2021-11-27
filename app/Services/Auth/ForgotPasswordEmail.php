<?php

declare(strict_types=1);

namespace App\Services\Auth;

class ForgotPasswordEmail
{
    public function send(string $email): string
    {
        $user = User::where('email', $email)->firstOrFail();
    }
}
