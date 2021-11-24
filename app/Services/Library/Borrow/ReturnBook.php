<?php

declare(strict_types=1);

namespace App\Services\Library\Borrow;

use App\Models\BorrowedBook;
use App\Models\CanBorrowBook;

class ReturnBook
{
    public function return(int $borrowId, ?\DateTime $returnDate = null, bool $isLost = false): BorrowedBook
    {
        $borrow = BorrowedBook::findOrFail($borrowId);
        $borrow->return_date = $returnDate ?? new \DateTime();
        $borrow->is_lost = $isLost;
        $borrow->update();
        if ($this->hasPenalities($borrow)) {
            $this->addPenalities($borrow);
        }

        return $borrow;
    }

    private function hasPenalities(BorrowedBook $borrowedBook): bool
    {
        $isLate = $borrowedBook->isLate();
        if ($isLate || $borrowedBook->is_lost) {
            return true;
        }

        return false;
    }

    private function addPenalities(BorrowedBook $borrowedBook): void
    {
        /** @var CanBorrowBook $canBorrow */
        $canBorrow = CanBorrowBook::where('user_id', $borrowedBook->user_id)->first();
        if ($borrowedBook->is_lost) {
            // penalidade
            // bloquear acesso da conta
        }
        $lateDays = $borrowedBook->lateDays();
        if ($lateDays < 10) {
            $canBorrow->increaseCanBorrowDate(2);
        }
        if ($lateDays >= 10 && $lateDays < 20) {
            $canBorrow->increaseCanBorrowDate(7);
        }
        if ($lateDays >= 20 && $lateDays < 30) {
            $canBorrow->increaseCanBorrowDate(14);
        }
        if ($lateDays >= 30 && $lateDays < 40) {
            $canBorrow->increaseCanBorrowDate(21);
        }
        $canBorrow->increaseCanBorrowDate(28);
    }
}
