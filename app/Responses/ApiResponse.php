<?php

declare(strict_types=1);

namespace App\Responses;

use App\Interfaces\ApiResponseInterface;

class ApiResponse implements ApiResponseInterface
{
    public function __construct(
        private string $consultResult,
        private bool $success = true
    ) {
    }

    public static function fail(string $message = ''): self
    {
        return new self($message, false);
    }

    public function response(): array
    {
        return [
            'success' => $this->success,
            'message' => $this->consultResult
        ];
    }
}
