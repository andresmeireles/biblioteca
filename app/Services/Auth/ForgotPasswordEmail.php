<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Mail\SendForgotPasswordEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordEmail
{
    public function sendEmail(string $email): void
    {
        $user = User::where('email', $email)->first();
        Mail::to($user->email)->send(new SendForgotPasswordEmail($user));
    }
}
