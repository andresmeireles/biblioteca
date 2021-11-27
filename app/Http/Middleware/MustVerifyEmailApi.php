<?php

namespace App\Http\Middleware;

use App\Responses\ConsultResponse;
use Closure;
use Illuminate\Http\Request;

class MustVerifyEmailApi
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
        if ($user->email_verified_at === null) {
            $hasVerifyEmail = [
                'verified' => false,
                'user' => $user
            ];
            $return = new ConsultResponse($hasVerifyEmail, false);
            return response()->json($return->response());
        }

        return $next($request);
    }
}
