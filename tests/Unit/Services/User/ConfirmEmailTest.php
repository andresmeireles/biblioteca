<?php

namespace Tests\Unit\Services\User;

use App\Models\User;
use App\Services\User\ConfirmEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ConfirmEmailTest extends TestCase
{
    use RefreshDatabase;

    private ConfirmEmail $confirm;

    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'email_verified_at' => null
        ]);
        $this->confirm = new ConfirmEmail();
    }

    public function testConfirmEmail(): void
    {
        $this->confirm->confim($this->user->id, str_rot13(sprintf('%s%s', $this->user->username, $this->user->created_at->getTimestamp())));
        
        $this->assertNotNull(User::first()->email_verified_at);
    }
}
