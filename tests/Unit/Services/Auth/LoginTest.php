<?php

declare(strict_types=1);

namespace Tests\Unit\Services\Auth;

use App\Models\User;
use App\Services\Auth\Login;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    private Login $login;

    private User $user;

    public function setUp(): void
    {
        parent::setUp();
        // to make tests easy the password is `name` field of User
        $this->user = User::factory()->create();
        Permission::create(['name' => 'admin']);
        $this->user->givePermissionTo('admin');
        $this->login = new Login();
    }

    public function testLoginUser(): void
    {
        $result = $this->login->userToken($this->user->username, $this->user->name);

        $this->assertIsString($result->response()['message']);
        $this->assertEquals(true, $result->response()['success']);
    }

    public function testFailLogin(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $login = $this->login->userToken('avell', 'pass');
        $result = $login->response();

        $this->assertEquals(false, $result['success']);
    }

    public function testEmailNonVerifiedLogin(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => null
        ]);
        $login = $this->login->userToken($user->username, $user->name);
        $result = $login->response();

        $this->assertEquals(false, $result['success']);
        $this->assertEquals(sprintf('para continuar verifique confirme seu email %s', $user->email), $result['message']);
    }

    public function testLoginAsAdminEvenIfIsNotVerified(): void
    {
        $this->user->email_verified_at = null;
        $this->user->update();
        $login = $this->login->userToken($this->user->username, $this->user->name);
        $result = $login->response();

        $this->assertEquals(true, $result['success']);
    }
}
