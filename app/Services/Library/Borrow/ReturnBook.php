<?php

declare(strict_types=1);

namespace App\Services\Library\Borrow;

use App\Models\BorrowedBook;
use App\Models\CanBorrowBook;
use App\Models\User;
use App\Services\Library\LibraryPermissionTrait;
use App\Services\User\BlockUser;

class ReturnBook
{
    use LibraryPermissionTrait;

    public function __construct(
        private BlockUser $blockUser
    ) {
    }

    public function return(int $librarianId, int $borrowId, ?\DateTime $returnDate = null, bool $isLost = false): BorrowedBook
    {
        $user = User::findOrFail($librarianId);
        $this->hasBorrowPermissionOrFail($user);
        $borrow = BorrowedBook::findOrFail($borrowId);
        $borrow->return_date = $returnDate ?? new \DateTime();
        $borrow->is_lost = $isLost;
        $borrow->finished = true;
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
        $canBorrow = CanBorrowBook::where('user_id', $borrowedBook->user_id)->first();
        if ($borrowedBook->is_lost) {
            dump($borrowedBook);
            $this->blockUser->blockUntil((int) $borrowedBook->user_id, 7);
            $canBorrow->increaseCanBorrowDate(28);
            return;
        }
        $lateDays = $borrowedBook->lateDays();
        if ($lateDays < 10) {
            $canBorrow->increaseCanBorrowDate(2);
            return;
        }
        if ($lateDays >= 10 && $lateDays < 20) {
            $canBorrow->increaseCanBorrowDate(7);
            return;
        }
        if ($lateDays >= 20 && $lateDays < 30) {
            $canBorrow->increaseCanBorrowDate(14);
            return;
        }
        if ($lateDays >= 30 && $lateDays < 40) {
            $canBorrow->increaseCanBorrowDate(21);
            return;
        }
        $canBorrow->increaseCanBorrowDate(28);
    }
}
