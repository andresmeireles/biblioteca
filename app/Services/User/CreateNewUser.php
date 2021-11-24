<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Actions\Fortify\CreateNewUser as FortifyCreateNewUser;
use App\Mail\ConfirmationEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class CreateNewUser
{
    public function __construct(
        private FortifyCreateNewUser $newUser
    ) {
    }

    public function regularUser(array $userData): User
    {
        $createdUser = $this->newUser->create($userData);
        $createdUser->assignRole('client');
        $this->sendConfirmationEmail($createdUser);

        return $createdUser;
    }

    public function sendConfirmationEmail(User $user): void
    {
        Mail::to($user->email)->send(new ConfirmationEmail($user));
    }
}
