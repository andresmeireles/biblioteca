<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
use App\Models\BookAmount;
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
        $amount = $bookData['amount'];
        $bookAmount = BookAmount::where('book_id', $book->id)->first();
        $minimalAmount = $bookAmount->amount - $bookAmount->available_amount;
        if ($amount === 0) {
            throw new \InvalidArgumentException('quantidade não pode ser zero.');
        }
        if ($amount < $minimalAmount) {
            throw new \InvalidArgumentException(sprintf('esse livro já possui emprestimos então o valor minimo que pode conter é %s', $minimalAmount));
        }
        $book->name = $bookData['name'];
        $book->code = $bookData['code'];
        $book->author = $bookData['author'];
        $book->publication_year = $bookData['publication_year'] ?? $bookData['publicationYear'];
        $book->genre = $bookData['genre'];
        $book->update();
        $bookAmount->amount = $amount;
        $bookAmount->available_amount = $amount - $minimalAmount;
        $bookAmount->update();

        return $book;
    }
}
