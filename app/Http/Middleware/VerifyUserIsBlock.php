<?php

namespace App\Http\Middleware;

use App\Responses\ApiResponse;
use Closure;
use Illuminate\Http\Request;

class VerifyUserIsBlock
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if ($user->isBlocked()) {
            $blockResponse = new ApiResponse('usuario bloqueado', false);
            return response()->json($blockResponse->response());
        }
        return $next($request);
    }
}
