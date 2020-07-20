<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Contracts\Session\Session;
use Spatie\Permission\Models\Role;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // if (!auth()->user()->hasAnyRole( Role::whereNotIn('name',['Customer','Guest'])->get()->pluck('name')->toArray() )) {
        //     return back();
        // }
        return $next($request);
    }
}
