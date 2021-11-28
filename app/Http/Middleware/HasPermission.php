<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Responses\ConsultResponse;
use Closure;
use Illuminate\Http\Request;

class HasPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $permission)
    {
        /** @var User $user */
        $user = $request->user();
        if (!$user->hasPermissionTo($permission)) {
            $permission = [
                'hasPermission' => false
            ];
            $response = new ConsultResponse($permission, false);
            return response()->json($response->response());
        }
        return $next($request);
    }
}
