<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
use App\Models\User;
use Spatie\Permission\Exceptions\UnauthorizedException;

trait LibraryPermissionTrait
{
    public function hasBookPermission(Book $book, User $user): bool
    {
        if ($user->hasPermissionTo('admin')) {
            return true;
        }
        $bookWasCreatedBy = $book->created_by->id;

        return $bookWasCreatedBy === $user->id;
    }

    public function hasBookPermissionOrFail(Book $book, User $user): bool
    {
        if (!$this->hasBookPermission($book, $user)) {
            throw new UnauthorizedException(45, 'cliente não tem permissão para fazer essa ação');
        }

        return true;
    }

    public function hasBorrowPermission(User $user): bool
    {
        return $user->hasPermissionTo('borrow') || $user->hasPermissionTo('admin');
    }

    /**
     * @throws UnauthorizedException
     */
    public function hasBorrowPermissionOrFail(User $user): bool
    {
        if (!$this->hasBorrowPermission($user)) {
            throw new UnauthorizedException(45, 'usuário não tem permissão para fazer essa ação');
        }

        return true;
    }
}
