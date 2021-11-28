<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BorrowedBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'pick_up_date',
        'expected_return_date',
        'return_date',
        'is_approved',
        'finished'
    ];

    public function getBookIdAttribute(int $value): Book
    {
        return Book::findOrFail($value);
    }

    public function getUserIdAttribute(int $value): User
    {
        return User::findOrFail($value);
    }

    public function isLate(): bool
    {
        $returnDate = ($this->return_date ?? now())->getTimestamp();
        $expectedDate = ( new \DateTime($this->expected_return_date) )->getTimestamp();

        return $returnDate > $expectedDate;
    }

    public function lateDays(): int
    {
        $returnDate = ($this->return_date ?? now()->toDateTime());
        $expectedReturnDate = new \DateTime($this->expected_return_date);
        $lateDays = (int) $expectedReturnDate->diff($returnDate)->format('%R%a');

        return $lateDays <= 0 ? 0 : abs($lateDays);
    }
}
