<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;

class CommonController extends Controller
{
    public function listRoles(Request $request){
        return Role::select('id','name')->whereNotIn('name',['Super Admin','Customer'])->get();
    }

    protected function responseSuccess($data = []) {

        $data['success'] = true;
        $data['code'] = 200;

        return response()->json($data, 200);
    }

    protected function responseError($message, $code = 422) {
        $data = [];
        $data['error'] = true;
        $data['code'] = $code;
        $data['message'] = $message;

        return response()->json($data, $code);
    }

}
