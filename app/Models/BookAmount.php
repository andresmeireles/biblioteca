<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookAmount extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'amount',
        'available_amount'
    ];

    public function isAvailable(): bool
    {
        return $this->available_amount >= 1;
    }

    public function getBookIdAttribute(string $value): Book
    {
        return Book::findOrFail((int) $value);
    }

    public static function plusOneAvailable(int $bookId): self
    {
        $amount = self::findOrFail($bookId);
        $availbleAmount = $amount->available_amount + 1;
        if ($availbleAmount > $amount->amount) {
            throw new \LogicException('available amount cannot be bigger than original amount');
        }
        $amount->available_amount = $availbleAmount;
        $amount->update();
        return $amount;
    }

    public static function minusOneAvailable(int $bookId): self
    {
        $amount = self::findOrFail($bookId);
        $availbleAmount = $amount->available_amount - 1;
        if ($availbleAmount < 0) {
            throw new \LogicException('available amount cannot be less than zero');
        }
        $amount->available_amount = $availbleAmount;
        $amount->update();
        return $amount;
    }
}
