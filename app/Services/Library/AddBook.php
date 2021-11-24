<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
use App\Models\BookAmount;

class AddBook
{
    public function add(array $addBook, int $bookAmount = 1): Book
    {
        $book = Book::create($addBook);
        BookAmount::create([
            'book_id' => $book->id,
            'amount' => $bookAmount,
            'available_amount' => $bookAmount
        ]);

        return $book;
    }
}
