<?php

namespace Modules\Admin\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use XT\LaravelBridge\LaravelBridge;

class VueLaravelBridgeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
	public function handle(Request$request, Closure $next, ...$guards)
    {
		$this->registerVueLaravelBridge();
		$response = $next($request);
        return $response;
    }

    public function registerVueLaravelBridge()
    {
    	$user = \Illuminate\Support\Facades\Auth::guard('admin')->user();
        LaravelBridge::share([
            'auth' => function () use ($user) {
                return [
                    'user' => $user ? [
                        'id' => $user->external_id,
                        'name' => $user->name,
                        'email' => $user->email,
						'avatar' => 'https://ui-avatars.com/api/?name='.$user->name.'&color=7F9CF5&background=EBF4FF',
                        'roles' => $user->roles->pluck('name'),
                        'permissions' => $user->getAllPermissions(),
                    ] : null,
                ];
            },
            'flash' => function () {
                return [
                    'success' => Session::get('success'),
                    'error' => Session::get('error'),
                ];
            },
        ]);
    }
}
