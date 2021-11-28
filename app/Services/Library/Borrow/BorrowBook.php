<?php

declare(strict_types=1);

namespace App\Services\Library\Borrow;

use App\Exceptions\UserCannotBorrowException;
use App\Models\BookAmount;
use App\Models\BorrowedBook;
use App\Models\CanBorrowBook;
use App\Models\User;
use App\Services\Library\LibraryPermissionTrait;

class BorrowBook
{
    use LibraryPermissionTrait;

    public function borrow(int $bookId, User $user, \DateTime $pickUpDate, \DateTime $expectReturnDate): BorrowedBook
    {
        if (!$this->userCanBorrow($user)) {
            throw new UserCannotBorrowException('usuário não pode pedir livros emprestados até uma data');
        }
        if (!$this->bookHasStore($bookId)) {
            throw new UserCannotBorrowException('livro não pode ser emprestado porque não está disponível em estoque');
        }
        if ($pickUpDate->getTimestamp() >= $expectReturnDate->getTimestamp()) {
            throw new \LogicException('data de entrega não pode ser menor ou igual a data de retirada');
        }
        $borrow = BorrowedBook::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'pick_up_date' => $pickUpDate,
            'expected_return_date' => $expectReturnDate,
        ]);
        BookAmount::minusOneAvailable($bookId);

        return $borrow;
    }

    public function changeApproveStatus(User $user, int $borrowId, bool $isAprove): BorrowedBook
    {
        $borrow = BorrowedBook::findOrFail($borrowId);
        $this->hasBorrowPermissionOrFail($user);
        $borrow->is_approved = $isAprove;
        $borrow->finished = !$isAprove;
        $borrow->update();
        if ($borrow->finished) {
            BookAmount::plusOneAvailable($borrow->book_id->id);
        }

        return $borrow;
    }

    public function userCanBorrow(User $user): bool
    {
        $userCanBorrow = CanBorrowBook::where('user_id', $user->id)->first();
        if ($userCanBorrow === null) {
            $canBorrow = CanBorrowBook::create([
                'user_id' => $user->id
            ]);

            return $canBorrow->canBorrow();
        }

        return $userCanBorrow->canBorrow();
    }

    public function bookHasStore(int $bookId): bool
    {
        $book = BookAmount::where('book_id', $bookId)->first();
        if ($book === null) {
            throw new \InvalidArgumentException('livro não existe');
        }
        return $book->isAvailable();
    }
}
