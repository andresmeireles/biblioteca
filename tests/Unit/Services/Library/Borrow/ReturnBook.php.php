<?php

declare(strict_types=1);

namespace Tests\Unit\Services\Library\Borrow;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// TODO devolução normal
// TODO devolução por alguém que não tem permissão
// TODO por alguém que não tem permissão
// TODO verificar aplicação de penalidades quando livro for entregue
// TODO garantir que a maior penalidade não seja sobreposto.
class ReturnBookTest extends TestCase
{
    use RefreshDatabase;
}
