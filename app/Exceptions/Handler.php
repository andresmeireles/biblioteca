<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Responses\ConsultResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var string[]
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var string[]
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (\Throwable $err, Request $request) {
            if ($request->is('api/*')) {
                return $this->errorResponseHandler($err);
            }
        });
        $this->reportable(function (\Throwable $e) {
            //
        });
    }

    private function errorResponseHandler(\Throwable $err): JsonResponse
    {
        $errorType = get_class($err);
        $response = match ($errorType) {
            \InvalidArgumentException::class, ValidationException::class => ConsultResponse::fail($err->getMessage())->response(),
            default => ConsultResponse::fail($err->getMessage())->response()
        };

        return response()->json($response, 400);
    }
}
