<?php

namespace Tests\Unit\Services\Library;

use App\Models\Book;
use App\Models\User;
use App\Services\Library\AddBook;
use App\Services\Library\DeleteBook;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class DeleteBookTest extends TestCase
{
    use RefreshDatabase;

    private AddBook $adder;

    private DeleteBook $delete;

    private User $nonAdminUser;

    private User $adminUser;

    private User $thirdUser;

    public function setUp(): void
    {
        parent::setUp();
        $this->adder = new AddBook();
        $this->delete = new DeleteBook();
        $this->adminUser = User::factory()->create();
        $this->nonAdminUser = User::factory()->create();
        $this->thirdUser = User::factory()->create();
        Permission::create(['name' => 'admin']);
        $this->adminUser->givePermissionTo('admin');
    }

    public function testDeleteAddedBook(): void
    {
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => 1,
        ];
        $book = $this->adder->add($data, 1, $this->adminUser);

        $this->delete->deleteById($book->id, $this->adminUser);

        $this->assertEquals(0, Book::all()->count());
    }

    public function testNonAdminUserDeleteBook(): void
    {
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => $this->nonAdminUser->id,
        ];
        $book = $this->adder->add($data, 1, $this->nonAdminUser);

        $this->delete->deleteById($book->id, $this->nonAdminUser);

        $this->assertEquals(0, Book::all()->count());
    }

    public function testCannotDeleteBookCreatedByAdmin(): void
    {
        $this->expectException(UnauthorizedException::class);

        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => 1,
        ];
        $book = $this->adder->add($data, 1, $this->adminUser);

        $this->delete->deleteById($book->id, $this->nonAdminUser);

        $this->assertEquals(1, Book::count());
    }

    public function testCannotDeleteBookCreatedByOtherUser(): void
    {
        $this->expectException(UnauthorizedException::class);

        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => $this->thirdUser->id,
        ];
        $book = $this->adder->add($data, 1, $this->thirdUser);

        $this->delete->deleteById($book->id, $this->nonAdminUser);

        $this->assertEquals(1, Book::all()->count());
    }

    public function testAdminCanDeleteAnyBook(): void
    {
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => $this->thirdUser->id,
        ];
        $book = $this->adder->add($data, 1, $this->nonAdminUser);
        $data2 = [
            'name' => 'comece pelo por que',
            'author' => 'simon sinek',
            'publication_year' => '2009',
            'code' => '9788543106632',
            'genre' => 'auto ajuda',
            'created_by' => $this->nonAdminUser->id,
        ];
        $book2 = $this->adder->add($data2, 1, $this->thirdUser);

        $this->delete->deleteById($book->id, $this->adminUser);
        $this->delete->deleteById($book2->id, $this->adminUser);

        $this->assertEquals(0, Book::count());
    }
}
