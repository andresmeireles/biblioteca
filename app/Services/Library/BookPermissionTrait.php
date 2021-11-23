<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
use App\Models\User;
use Spatie\Permission\Exceptions\UnauthorizedException;

trait BookPermissionTrait
{
    public function hasPermission(Book $book, User $user): bool
    {
        if ($user->hasPermissionTo('admin')) {
            return true;
        }
        $bookWasCreatedBy = (int) $book->created_by;

        return $bookWasCreatedBy === $user->id;
    }

    public function hasPermissionOrFail(Book $book, User $user): bool
    {
        if (!$this->hasPermission($book, $user)) {
            throw new UnauthorizedException(45, 'cliente não tem permissão para fazer essa ação');
        }

        return true;
    }
}
