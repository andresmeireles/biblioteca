<?php

declare(strict_types=1);

namespace Tests\Unit\Services\User;

use App\Actions\Fortify\CreateNewUser as FortifyCreateNewUser;
use App\Services\User\CreateNewUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateNewUserTest extends TestCase
{
    use RefreshDatabase;

    private CreateNewUser $createNewUser;

    public function setUp(): void
    {
        parent::setUp();

        $this->createNewUser = new CreateNewUser(new FortifyCreateNewUser());
    }

    public function testCreateRegularUser(): void
    {
        $result = $this->createNewUser->regularUser([
            'name' => 'test',
            'username' => 'testusername',
            'email' => 'testemail@gmail.com',
            'password' => 'senha',
            'password_confirmation' => 'senha'
        ]);

        $this->assertIsObject($result);
    }
}
