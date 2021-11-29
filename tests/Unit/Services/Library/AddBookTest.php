<?php

namespace Tests\Unit\Services\Library;

use App\Models\Book;
use App\Models\User;
use App\Services\Library\AddBook;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddBookTest extends TestCase
{
    use RefreshDatabase;

    private AddBook $adder;

    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->adder = new AddBook();
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testAddBook(): void
    {
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => 1,
        ];
        $this->adder->add($data, 1, $this->user);

        $result = Book::all()->count();
        $this->assertEquals(1, $result);
    }

    // Error will throw
    public function testErrorOnAddBook(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => 1,
        ];
        $this->adder->add($data, 1, $this->user);
        $this->adder->add($data, 1, $this->user);
        
        $this->assertEquals(2, Book::all()->count());
    }

    public function testErrorWhenAmountIsZero(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => 1,
        ];
        $this->adder->add($data, 0, $this->user);
        
        $this->assertEquals(2, Book::all()->count());
    }
}
