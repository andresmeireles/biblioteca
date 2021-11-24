<?php

declare(strict_types=1);

namespace Tests\Unit\Services\User;

use App\Models\BlockUser as ModelsBlockUser;
use App\Models\User;
use App\Services\User\BlockUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlockUserTest extends TestCase
{
    use RefreshDatabase;

    private BlockUser $block;

    private User $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->block = new BlockUser();
        $this->user = User::factory()->create();
    }

    public function testBlockUser(): void
    {
        $user = User::factory()->create();
        $this->block->blockUntil($user->id, 20);

        $this->assertEquals(true, $user->isBlocked());
    }

    public function testNonBlockUser(): void
    {
        $user = User::factory()->create();

        $this->assertEquals(false, $user->isBlocked());
    }

    public function testOverdueBlockUser(): void
    {
        ModelsBlockUser::create([
            'user_id' => $this->user->id,
            'block_until_date' => (new \DateTime())->sub(new \DateInterval('P2D'))
        ]);

        $this->assertEquals(false, $this->user->isBlocked());
    }
}
