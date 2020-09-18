<?php

namespace Modules\Admin\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;

class CommonController extends Controller
{
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
