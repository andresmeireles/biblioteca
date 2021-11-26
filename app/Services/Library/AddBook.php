<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
use App\Models\BookAmount;
use App\Models\User;

class AddBook
{
    public function add(array $addBook, int $bookAmount = 1, User $user): Book
    {
        if (Book::where('code', $addBook['code'])->first() !== null) {
            throw new \InvalidArgumentException('livro já cadastrado com esse código');
        }
        $addBook['created_by'] = $user->id;
        $book = Book::create($addBook);
        $amount = abs($bookAmount);
        BookAmount::create([
            'book_id' => $book->id,
            'amount' => $amount,
            'available_amount' => $amount
        ]);

        return $book;
    }
}
