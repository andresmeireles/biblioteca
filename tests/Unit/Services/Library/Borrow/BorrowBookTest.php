<?php

namespace Tests\Unit\Services\Library\Borrow;

use App\Exceptions\UserCannotBorrowException;
use App\Models\Book;
use App\Models\BorrowedBook;
use App\Models\CanBorrowBook;
use App\Models\User;
use App\Services\Library\AddBook;
use App\Services\Library\Borrow\BorrowBook;
use Illuminate\Foundation\Testing\RefreshDatabase;
use LogicException;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class BorrowBookTest extends TestCase
{
    use RefreshDatabase;

    private BorrowBook $borrow;
    private AddBook $addBook;
    private User $user;
    private User $librarian;

    public function setUp(): void
    {
        parent::setUp();
        $this->borrow = new BorrowBook();
        $this->user = User::factory()->create();
        $this->addBook = new AddBook();
        $librarianPermission = Permission::create(['name' => 'borrow']);
        $this->librarian = User::factory()->create();
        $this->librarian->givePermissionTo($librarianPermission);
    }

    private function addBook(int $amount = 1): Book
    {
        return $this->addBook->add(
            [
                'name' => 'nas montanhas da loucura',
                'author' => 'h. p. lovecraft',
                'publication_year' => '1996',
                'code' => '51',
                'genre' => 'horror',
                'created_by' => 1,
            ],
            $amount
        );
    }

    public function testBorrowBook(): void
    {
        $book = $this->addBook();
        $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));

        $this->assertEquals(null, BorrowedBook::first()->is_approved);
        $this->assertEquals(1, BorrowedBook::all()->count());
        $this->assertEquals((new \DateTime())->add(new \DateInterval('P2D'))->getTimestamp(), ( new \DateTIme(BorrowedBook::first()->expected_return_date) )->getTimestamp());
    }

    public function testNoAvailableStorageBookBorrow(): void
    {
        $this->expectException(UserCannotBorrowException::class);
        $this->expectExceptionMessage('livro não pode ser emprestado porque não está disponível em estoque');
        $book = $this->addBook(0);
        $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));

        $this->assertEquals(1, BorrowedBook::all()->count());
    }

    public function testUserCannotBorrow(): void
    {
        $this->expectException(UserCannotBorrowException::class);
        $book = $this->addBook();
        CanBorrowBook::create(['user_id' => $this->user->id, 'can_borrow_at' => (new \DateTime())->add(new \DateInterval('P1D'))]);
        $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));

        $this->assertEquals(1, BorrowedBook::all()->count());
    }

    public function testBorrowWithSamePickupAndReturnDate(): void
    {
        $this->expectException(LogicException::class);
        $this->expectExceptionMessage('data de entrega não pode ser menor ou igual a data de retirada');
        $book = $this->addBook();
        $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), new \DateTime());

        $this->assertEquals(1, BorrowedBook::all()->count());
    }

    public function testBorrowWithReturnBeforePickup(): void
    {
        $this->expectException(LogicException::class);
        $this->expectExceptionMessage('data de entrega não pode ser menor ou igual a data de retirada');
        $book = $this->addBook();
        $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->sub(new \DateInterval('P2D')));

        $this->assertEquals(1, BorrowedBook::all()->count());
    }

    public function testValidateBorrow(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);

        $this->assertEquals(true, BorrowedBook::first()->is_approved);
        $this->assertEquals(false, (bool) BorrowedBook::first()->finished);
    }

    public function testValidateBorrowAsFalse(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, false);

        $this->assertEquals(false, (bool) BorrowedBook::first()->is_approved);
        $this->assertEquals(true, BorrowedBook::first()->finished);
    }
    
    public function testValidateBorrowAsNoLibrarian(): void
    {
        $this->expectException(UnauthorizedException::class);
        $this->expectExceptionMessage('usuário não pode realizar essa ação');

        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));
        $this->borrow->changeApproveStatus($this->user->id, $borrow->id, true);

        $this->assertEquals(true, BorrowedBook::first()->is_approved);
    }
}
