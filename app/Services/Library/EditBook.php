<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
use App\Models\User;

class EditBook
{
    use LibraryPermissionTrait;

    public function editById(int $bookId, array $bookData, User $user): Book
    {
        /** @var Book $book */
        $book = Book::findOrFail($bookId);
        $this->hasBookPermissionOrFail($book, $user);
        return $this->runEdit($book, $bookData);
    }

    private function runEdit(Book $book, array $bookData): Book
    {
        $book->name = $bookData['name'];
        $book->code = $bookData['code'];
        $book->author = $bookData['author'];
        $book->publication_year = $bookData['publication_year'];
        $book->genre = $bookData['genre'];
        $book->update();

        return $book;
    }
}
