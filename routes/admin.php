<?php


 Route::group(['middleware' => App\Http\Middleware\CheckAdmin::class], function () {
     Route::get('/', 'HomeController@index');
     // Route::get('dashboard/reports', 'DashboardController@reports');
     // Route::get('dashboard/jobstatus', 'DashboardController@jobstatus');
     // Route::get('dashboard/todays_counter', 'DashboardController@todays_counter');

     Route::apiResource('user', 'UserController');
     Route::apiResource('customer', 'CustomersController');
     Route::apiResource('role', 'RoleController');
     Route::get('get_roles', 'CommonController@listRoles');
     Route::get('get_permissions', function () {
         return \Spatie\Permission\Models\Permission::all();
     });

 });
