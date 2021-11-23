<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Actions\Fortify\CreateNewUser as FortifyCreateNewUser;
use App\Models\User;

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

        return $createdUser;
    }
}
