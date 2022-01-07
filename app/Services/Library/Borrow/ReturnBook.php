<?php

declare(strict_types=1);

namespace App\Services\Library\Borrow;

use App\Models\BookAmount;
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

    public function return(User $librarian, int $borrowId, ?\DateTime $returnDate = null, bool $isLost = false): BorrowedBook
    {
        $this->hasBorrowPermissionOrFail($librarian);
        $borrow = BorrowedBook::findOrFail($borrowId);
        $borrow->return_date = $returnDate ?? new \DateTime();
        $borrow->is_lost = $isLost;
        $borrow->finished = true;
        if ($this->hasPenalities($borrow)) {
            $this->addPenalities($borrow);
        }
        $borrow->update();
        BookAmount::plusOneAvailable($borrow->book_id->id);

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
        $canBorrow = CanBorrowBook::where('user_id', $borrowedBook->user_id->id)->first();
        if ($canBorrow === null) {
            $canBorrow = CanBorrowBook::create([
                'user_id' => $borrowedBook->user_id->id,
                'can_borrow_at' => now()
            ]);
        }
        if ($borrowedBook->is_lost) {
            $this->blockUser->blockUntil((int) $borrowedBook->user_id->id, 7);
            $canBorrow->increaseCanBorrowDate(28);
            return;
        }
        $lateDays = $borrowedBook->lateDays();
        if ($lateDays < 10) {
            $canBorrow->increaseCanBorrowDate(2);
            return;
        }
        if ($lateDays < 20) {
            $canBorrow->increaseCanBorrowDate(7);
            return;
        }
        if ($lateDays < 30) {
            $canBorrow->increaseCanBorrowDate(14);
            return;
        }
        if ($lateDays < 40) {
            $canBorrow->increaseCanBorrowDate(21);
            return;
        }
        $canBorrow->increaseCanBorrowDate(28);
    }
}
