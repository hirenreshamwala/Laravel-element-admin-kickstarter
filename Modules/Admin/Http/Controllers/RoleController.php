<?php

namespace Modules\Admin\Http\Controllers;

use Modules\Admin\Http\Requests\Role\StoreRoleRequest;
use Modules\Admin\Http\Requests\Role\UpdateRoleRequest;
use Modules\Admin\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends CommonController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Modules\Admin\Http\Resources\RoleResource
	 */
    public function index(Request $request)
    {
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

        $roles = Role::whereNotIn('name',['Super'])
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

	public function listRoles(Request $request){
		return Role::select('id','name')->whereNotIn('name',['Super'])->get();
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
     * @param  StoreRoleRequest  $request
     * @return \Illuminate\Http\JsonResponse
	 */
    public function store(StoreRoleRequest $request)
    {
        $request->validate([
            'name'=>'required',
            'permissions'=>'required',
        ]);

        $role = Role::create(['name' => $request->name]);
        $permissions = Permission::whereIn('id',$request->permissions)->get();
        $role->syncPermissions($permissions);

		return $this->responseSuccess(['message'=>'Role created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return RoleResource
	 */
    public function show($id)
    {
        return new RoleResource(Role::select('id','name')->with([
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
     * @param  UpdateRoleRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
	 */
    public function update(UpdateRoleRequest $request, $id)
    {
        $role = Role::find($id);

//        $roles = Role::where('name','=',$request->name)->where('id','!=',$id)->first();
//        if ($roles){
//            return $this->responseError('Role `'.$request->name.'` already exist');
//        }

        if ($role) {
            $role->name = $request->name;
            $role->save();
            $permissions = Permission::whereIn('id',$request->permissions)->get();
            $role->syncPermissions($permissions);
        }

		return $this->responseSuccess(['message'=>'Role updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
	 */
    public function destroy($id)
    {
		return $this->responseSuccess(['message'=>'Role deleted successfully']);
    }
}
