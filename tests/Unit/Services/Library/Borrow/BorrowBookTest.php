<?php

namespace Tests\Unit\Services\Library\Borrow;

use App\Models\User;
use App\Services\Library\AddBook;
use App\Services\Library\Borrow\BorrowBook;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// TODO empréstimo padrão
// todo empréstimo de livro sem estoque
// TODO empréstimo a cliente que não pode alugar livro
// TODO empréstimo com datas invalidas
class BorrowBookTest extends TestCase
{
    use RefreshDatabase;

    private BorrowBook $borrow;
    private AddBook $addBook;
    private User $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->borrow = new BorrowBook();
        $this->user = User::factory()->create();
    }
}
