<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;
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

    /**
     * @return \Illuminate\Support\Collection|array<Book>
     */
    public function booksCreatedBy(int $userId): Collection|array
    {
        return Book::where('created_by', $userId)->get();
    }
}
