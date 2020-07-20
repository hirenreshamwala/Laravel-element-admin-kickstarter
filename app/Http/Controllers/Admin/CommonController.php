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
}
