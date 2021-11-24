<?php

namespace Tests\Unit\Services\Library;

use App\Models\Book;
use App\Models\User;
use App\Services\Library\AddBook;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddBookTest extends TestCase
{
    use RefreshDatabase;

    private AddBook $adder;

    public function setUp(): void
    {
        parent::setUp();

        User::factory()->create();

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
        $this->adder->add($data);

        $result = Book::all()->count();
        $this->assertEquals(1, $result);
    }

    // Error will th
    public function testErrorOnAddBook(): void
    {
        $this->expectException(QueryException::class);
        $data = [
            'name' => 'nas montanhas da loucura',
            'author' => 'h. p. lovecraft',
            'publication_year' => '1996',
            'code' => '51',
            'genre' => 'horror',
            'created_by' => 1,
        ];
        $this->adder->add($data);
        $this->adder->add($data);
        
        $this->assertEquals(2, Book::all()->count());
    }
}
