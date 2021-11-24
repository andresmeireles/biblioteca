<?php

namespace Tests\Unit\Services\Library;

use App\Models\User;
use App\Services\Library\AddBook;
use App\Services\Library\EditBook;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class EditBookTest extends TestCase
{
    use RefreshDatabase;

    private AddBook $adder;

    private EditBook $editor;

    private User $nonAdminUser;

    private User $adminUser;

    private User $thirdUser;

    public function setUp(): void
    {
        parent::setUp();
        $this->adder = new AddBook();
        $this->editor = new EditBook();
        $this->adminUser = User::factory()->create();
        $this->nonAdminUser = User::factory()->create();
        $this->thirdUser = User::factory()->create();
        Permission::create(['name' => 'admin']);
        $this->adminUser->givePermissionTo('admin');
    }

    public function testEditAddedBook(): void
    {
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => 1,
        ];
        $book = $this->adder->add($data);

        $editBook = [
            'name' => 'nas montanhas da felicidade',
            'author' => 'm. p. lovecraft',
            'publication_year' => 1500,
            'code' => 12,
            'genre' => 'comedy'
        ];

        $result = $this->editor->editById($book->id, $editBook, User::first());

        $this->assertEquals($editBook['name'], $result->name);
    }

    public function testNonAdminUserEditBook(): void
    {
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => $this->nonAdminUser->id,
        ];
        $book = $this->adder->add($data);

        $editBook = [
            'name' => 'nas montanhas da felicidade',
            'author' => 'm. p. lovecraft',
            'publication_year' => 1500,
            'code' => 12,
            'genre' => 'comedy'
        ];

        $result = $this->editor->editById($book->id, $editBook, $this->nonAdminUser);

        $this->assertEquals($editBook['name'], $result->name);
    }

    public function testCannotEditBookCreatedByAdmin(): void
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
        $book = $this->adder->add($data);

        $editBook = [
            'name' => 'nas montanhas da felicidade',
            'author' => 'm. p. lovecraft',
            'publication_year' => 1500,
            'code' => 12,
            'genre' => 'comedy'
        ];

        $result = $this->editor->editById($book->id, $editBook, $this->nonAdminUser);

        $this->assertEquals($editBook['name'], $result->name);
    }

    public function testCannotEditBookCreatedByOtherUser(): void
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
        $book = $this->adder->add($data);

        $editBook = [
            'name' => 'nas montanhas da felicidade',
            'author' => 'm. p. lovecraft',
            'publication_year' => 1500,
            'code' => 12,
            'genre' => 'comedy'
        ];

        $result = $this->editor->editById($book->id, $editBook, $this->nonAdminUser);

        $this->assertEquals($editBook['name'], $result->name);
    }

    public function testAdminCanEditAnyBook(): void
    {
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => $this->thirdUser->id,
        ];
        $book = $this->adder->add($data);
        $data2 = [
            'name' => 'comece pelo por que',
            'author' => 'simon sinek',
            'publication_year' => '2009',
            'code' => '9788543106632',
            'genre' => 'auto ajuda',
            'created_by' => $this->nonAdminUser->id,
        ];
        $book2 = $this->adder->add($data2);

        $editBook = [
            'name' => 'nas montanhas da felicidade',
            'author' => 'm. p. lovecraft',
            'publication_year' => 1500,
            'code' => 12,
            'genre' => 'comedy'
        ];

        $editBook2 = [
            'name' => 'não comece pelo por que',
            'author' => 'jose alfredo',
            'publication_year' => 2010,
            'code' => '15600',
            'genre' => 'ficção'
        ];

        $result1 = $this->editor->editById($book->id, $editBook, $this->adminUser);
        $result2 = $this->editor->editById($book2->id, $editBook2, $this->adminUser);

        $this->assertEquals($editBook['name'], $result1->name);
        $this->assertEquals($editBook2['name'], $result2->name);
    }
}
