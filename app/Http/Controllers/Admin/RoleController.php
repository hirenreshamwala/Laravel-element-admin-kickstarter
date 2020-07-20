<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Exceptions\RoleDoesNotExist;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
//        Permission::create(['name' => 'dashboard.list']);
//        Permission::create(['name' => 'users.list']);
//        Permission::create(['name' => 'users.add']);
//        Permission::create(['name' => 'users.edit']);
//        Permission::create(['name' => 'users.delete']);


        $pageNumber = $request->input('page', 1);
        $noOfRows = $request->input('rows', 20);
        $sort_by = $request->input('sort', 'id');
        $sort_order = $request->input('order', 'd');
        $search = $request->input('s');

        if ($sort_by == ''){
            $sort_by = 'id';
        }
        if ($sort_order == ''){
            $sort_order = 'd';
        }
        if ($sort_order == 'a'){
            $sort_order = 'asc';
        } else {
            $sort_order = 'desc';
        }

        $roles = Role::whereNotIn('name',['Super Admin','Customer'])
        ->where(function($query ) use ($search)
        {
            if($search)
                $query->where('name', 'like', '%'.$search.'%');

        })
        ->with('permissions')
            ->orderBy($sort_by,$sort_order)
            ->paginate($noOfRows,['*'],'page',$pageNumber);

        return RoleResource::collection($roles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'permissions'=>'required',
        ]);

        $role = Role::findByName(Input::get('name'));
        if ($role){
            return array(
                'status' => 'error',
                'message' => 'Role `'.Input::get('name').'` already exist'
            );
        }
        $role = Role::create(['name' => Input::get('name')]);
        $permissions = Permission::whereIn('id',Input::get('permissions'))->get();
        $role->syncPermissions($permissions);

        return array(
            'status' => 'success',
            'message' => 'Role created successfully'
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new RoleResource(Role::with([
            'permissions'  => function ($query) {
                $query->select(['id', 'name']);
            }
        ])->find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);

        $roles = Role::where('name','=',Input::get('name'))->where('id','!=',$id)->first();
        if ($roles){
            return array(
                'status' => 'error',
                'message' => 'Role `'.Input::get('name').'` already exist'
            );
        }

        if ($role) {
            $role->name = Input::get('name');
            $role->save();
            $permissions = Permission::whereIn('id',Input::get('permissions'))->get();
            $role->syncPermissions($permissions);
        }

        return array(
            'status' => 'success',
            'message' => 'Role updated successfully'
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return array(
            'status' => 'success',
            'message' => 'Role deleted successfully'
        );
    }
}
