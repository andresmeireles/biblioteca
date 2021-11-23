<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
use App\Models\User;

class DeleteBook
{
    use BookPermissionTrait;

    public function deleteById(int $bookId, User $user): Book
    {
        /** @var Book $book */
        $book = Book::findOrFail($bookId);
        $this->hasPermissionOrFail($book, $user);
        return $this->runDelete($book);
    }

    private function runDelete(Book $book): Book
    {
        $book->delete();
        return $book;
    }
}
