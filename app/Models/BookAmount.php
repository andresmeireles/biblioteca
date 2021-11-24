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
}
