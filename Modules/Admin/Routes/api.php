<?php

use Illuminate\Http\Request;
use App\Http\Middleware\AuthenticateAdmin;
use Modules\Admin\Http\Middleware\VueLaravelBridgeMiddleware;
use Spatie\Permission\Models\Permission;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/admin', function (Request $request) {
//    return $request->user();
//});
Route::prefix('admin')->group(function () {
    Route::middleware(['auth:admin',VueLaravelBridgeMiddleware::class])->group(function (){
        Route::get('/info', function (){
            $user = \Illuminate\Support\Facades\Auth::guard('admin')->user();
            if ($user){
                $data = [
                    'data' => [
                        'roles' => $user->roles->pluck('name'),
                        'name' => $user->name,
                        'avatar' => '',
                        'introduction' => '',
                        'permissions' => $user->getAllPermissions(),
                        'token' => $user->external_id,
                        'user' => [
                            'id' => $user->external_id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'avatar' => 'https://ui-avatars.com/api/?name='.$user->name.'&color=7F9CF5&background=EBF4FF',
                            'roles' => $user->roles->pluck('name'),
                            'permissions' => $user->getAllPermissions(),
                        ]
                    ]
                ];
                return response()->json($data, 200);
            }
        });

        Route::apiResource('user', 'UserController');
        Route::apiResource('customer', 'CustomersController');

        Route::get('role/list', 'RoleController@listRoles');
        Route::apiResource('role', 'RoleController');

        Route::get('permissions', function () {
            return Permission::select('id','name')->where('guard_name','admin')->get();
        });
    });
    Route::middleware('auth:sanctum')->get('/uinfo', function (Request $request) {
        return $request->user();
    });
//	Route::middleware('auth:sanctum')->get('/athenticated', function () {
//		return true;
//	});
//Route::post('register', 'RegisterController@register');
    Route::post('login', 'LoginController@login');
    Route::get('test', 'LoginController@test');
    Route::post('logout', 'LoginController@logout');
});
