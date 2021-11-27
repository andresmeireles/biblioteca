<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Actions\Fortify\ResetUserPassword;
use App\Models\User;
use App\Services\Auth\CanRedefine;

class ChangeForgottenPassword
{
    public function __construct(
        private ResetUserPassword $resetUserPassword,
        private CanRedefine $canRedefine
    ) {
    }

    public function change(int $userId, string $hash, array $password): bool
    {
        if (!$this->canRedefine->can($userId, $hash)) {
            return false;
        }
        $user = User::findOrFail($userId);
        $this->resetUserPassword->reset($user, $password);
        return true;
    }
}
