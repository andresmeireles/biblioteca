<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Exceptions\ValidationException;
use App\Models\Book;
use App\Models\BookAmount;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AddBook
{
    public function add(array $addBook, int $bookAmount, User $user): Book
    {
        if (Book::where('code', $addBook['code'])->first() !== null) {
            throw new \InvalidArgumentException('livro já cadastrado com esse código');
        }
        $errors = Validator::make($addBook, [
            'name' => ['required'],
            'author' => ['required'],
            'code' => ['required'],
            'genre' => ['required'],
            'publication_year' => ['required'],
        ])->errors();
        if (count($errors) > 0) {
            throw new ValidationException($errors->first());
        }
        $addBook['created_by'] = $user->id;
        $book = Book::create($addBook);
        $amount = abs($bookAmount);
        if ($amount === 0) {
            throw new \InvalidArgumentException('quantidade do livro não pode ser zero.');
        }
        BookAmount::create([
            'book_id' => $book->id,
            'amount' => $amount,
            'available_amount' => $amount
        ]);

        return $book;
    }
}
