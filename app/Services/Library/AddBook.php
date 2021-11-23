<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Models\Book;

class AddBook
{
    public function add(array $addBook): Book
    {
        return Book::create($addBook); 
    }
}
