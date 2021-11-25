<?php

declare(strict_types=1);

namespace Tests\Unit\Services\Library\Borrow;

use App\Models\Book;
use App\Models\CanBorrowBook;
use App\Models\User;
use App\Services\Library\AddBook;
use App\Services\Library\Borrow\BorrowBook;
use App\Services\Library\Borrow\ReturnBook;
use App\Services\User\BlockUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

// TODO por alguém pelo admin
// TODO verificar aplicação de penalidades quando livro for entregue
// TODO garantir que a maior penalidade não seja sobreposto.
class ReturnBookTest extends TestCase
{
    use RefreshDatabase;

    private ReturnBook $returnBook;

    private BorrowBook $borrow;

    private AddBook $addBook;

    private User $librarian;

    private User $user;

    public function setUp(): void
    {
        parent::setUp();
        Permission::create(['name' => 'borrow']);
        Permission::create(['name' => 'admin']);
        $this->returnBook = new ReturnBook(new BlockUser());
        $this->user = User::factory()->create();
        $this->librarian = User::factory()->create();
        $this->librarian->givePermissionTo('borrow');
        $this->borrow = new BorrowBook();
        $this->addBook = new AddBook();
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

    public function testReturnBook(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);

        $result = $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P2D')));

        $this->assertEquals(true, $result->finished);
    }

    public function testNonLibrarianReturn(): void
    {
        $this->expectException(UnauthorizedException::class);
        $this->expectExceptionMessage('usuário não tem permissão para fazer essa ação');
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);

        $result = $this->returnBook->return($this->user->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P2D')));

        $this->assertEquals(true, $result->finished);
    }

    public function testPenalityForLessThan10Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P2D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P3D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P2D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityForLessThan10DaysLimit(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P10D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P2D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityFor10Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P11D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P7D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityForLessThan20Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P20D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P7D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityFor20Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P21D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P14D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityForLessThan30Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P30D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P14D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityFor30Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P31D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P21D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityForLessThan40Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P40D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P21D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityFor40Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P41D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P28D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testPenalityForMoreThan40Days(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P80D')));
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P28D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testEnsureBiggerPenality(): void
    {
        $book = $this->addBook(2);
        
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $borrow2 = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow2->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, (new \DateTime())->add(new \DateInterval('P80D')));
        $this->returnBook->return($this->librarian->id, $borrow2->id, (new \DateTime())->add(new \DateInterval('P2D')));

        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P28D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
    }

    public function testLossBook(): void
    {
        $book = $this->addBook();
        $borrow = $this->borrow->borrow($book->id, $this->user->id, new \DateTime(), (new \DateTime())->add(new \DateInterval('P1D')));
        $this->borrow->changeApproveStatus($this->librarian->id, $borrow->id, true);
        $this->returnBook->return($this->librarian->id, $borrow->id, isLost: true);
        $canBorrow = CanBorrowBook::where('user_id', $this->user->id)->first()->can_borrow_at;
        $canBorrowDt = (new \DateTime($canBorrow))->format('d/m/Y');
        $canBorrowDate = (new \DateTime())->add(new \DateInterval('P28D'))->format('d/m/Y');

        $this->assertEquals($canBorrowDate, $canBorrowDt);
        $this->assertEquals(true, $this->user->isBlocked());
    }
}
