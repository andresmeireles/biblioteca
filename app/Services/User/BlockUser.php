<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Models\User;

class BlockUser
{
    public function blockUntil(int $userId, int $daysBlocked): User
    {
        $user = User::findOrFail($userId);
        $blockUntil = (new \DateTime())->add(new \DateInterval(sprintf('P%sD', $daysBlocked)));
        $user->blockUser($blockUntil);

        return $user;
    }
}
