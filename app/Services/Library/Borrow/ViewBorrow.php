<?php

declare(strict_types=1);

namespace App\Services\Library\Borrow;

use App\Models\BorrowedBook;
use Illuminate\Support\Collection;

class ViewBorrow
{
    /**
     * @return Collection|array<BorrowedBook>
     */
    public function all(): Collection|array
    {
        return BorrowedBook::all();
    }

    /**
     * @return Collection|array<BorrowedBook>
     */
    public function nonFinished(): Collection|array
    {
        return BorrowedBook::where('finished', false)->get();
    }

    /**
     * @return Collection|array<BorrowedBook>
     */
    public function byUser(int $userId): Collection|array
    {
        return BorrowedBook::where('user_id', $userId)->get();
    }

    /**
     * @return BorrowedBook
     */
    public function byId(int $borrowId): BorrowedBook
    {
        return BorrowedBook::find($borrowId);
    }

    /**
     * @return \Illuminate\Support\Collection|array<BorrowedBook>
     */
    public function toApprove(): Collection|array
    {
        return BorrowedBook::where('finished', false)->where('is_approved', null)->get();
    }
}
