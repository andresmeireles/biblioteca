<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
use App\Models\BookAmount;
use Doctrine\DBAL\Query\QueryException as QueryQueryException;
use Illuminate\Support\Collection;

class ViewBook
{
    /**
     * @return \Illuminate\Support\Collection|array<Book>
     */
    public function all(): Collection|array
    {
        return Book::all();
    }

    public function bookWithAmountById(int $id): BookAmount
    {
        $book = BookAmount::where('book_id', $id)->first();
        if ($book === null) {
            throw new QueryQueryException('elemento not found');
        }

        return $book;
    }

    /**
     * @return \Illuminate\Support\Collection|array<Book>
     */
    public function booksCreatedBy(int $userId): Collection|array
    {
        return Book::where('created_by', $userId)->get();
    }
}
