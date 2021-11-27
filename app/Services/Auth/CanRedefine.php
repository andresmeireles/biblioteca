<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CanRedefine
{
    public function can(int $userId, string $hash): bool
    {
        $user = User::findOrFail($userId);
        return Hash::check($user->username, $hash);
    }
}
