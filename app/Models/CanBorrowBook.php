<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property \DateTime $can_borrow_at
 */
class CanBorrowBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'can_borrow_at'
    ];

    public function canBorrow(): bool
    {
        $today = now()->getTimestamp();
        $canBorrowTimestamp = (new \DateTime($this->can_borrow_at))->getTimestamp();

        return $today >= $canBorrowTimestamp;
    }

    public function increaseCanBorrowDate(int $numberOfDays): self
    {
        $newBorrowDate = (new \DateTime())->add(new \DateInterval(sprintf('P%sD', $numberOfDays)));
        $borrowDate = new \DateTime($this->can_borrow_at);
        $biggerPenality = $borrowDate->getTimestamp() > $newBorrowDate->getTimestamp() ? $borrowDate : $newBorrowDate;
        $this->can_borrow_at = $biggerPenality;
        $this->update();

        return $this;
    }
}
