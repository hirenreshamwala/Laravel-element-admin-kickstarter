<?php

namespace Modules\Admin\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Modules\Admin\Http\Requests\User\StoreUserRequest;
use Modules\Admin\Http\Requests\User\UpdateUserRequest;
use Modules\Admin\Http\Resources\UserResource;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Webpatser\Uuid\Uuid;
use Exception;

class UserController extends CommonController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index(Request $request)
    {
        $pageNumber = $request->input('page', 1);
        $noOfRows = $request->input('rows', 20);

        $users = AdminUser::whereDoesntHave('roles', function (Builder $query) {
				$query->where('name', '=', 'Super');
			})
            ->whereNotIn('id',[Auth::user()->id])
            ->when(request('s'), function ($query) {
                return $query->where('email', 'like', '%'.request('s').'%')
                    ->orWhere('name', 'like', '%'.request('s').'%');
            })
            ->when(request('sort') || request('order'), function ($query) {
                $sort_by = request('sort', 'id');
                $sort_order = (request('order', 'd') == 'a') ? 'asc' : 'desc';
                return $query->orderBy($sort_by,$sort_order);
            })
            ->paginate($noOfRows,['*'],'page',$pageNumber);
        return UserResource::collection($users);
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
     * @param StoreUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws Exception
     */
    public function store(StoreUserRequest $request)
    {
        try {
            $user = AdminUser::create(array(
                'external_id'=>Uuid::generate()->string,
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
//                'contact_number' => $request->contact_number,
//                'comment' => $request->comment,
                'password' => Hash::make($request->password),
            ));
            $user->assignRole($request->userrole);
            return $this->responseSuccess(['message'=>'User created successfully']);
        } catch (\Exception $e){
            if (config('app.debug')) {
                throw new \Exception('Exception::: '.$e->getMessage(), 400);
            }
            throw new \Exception('Unable to save the data.', 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return UserResource
     */
    public function show($id)
    {
        return new UserResource(AdminUser::findByExternalId($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws Exception
     */
    public function update($id, UpdateUserRequest $request)
    {
        $user = AdminUser::findByExternalId($id);
        if ($user){
            try {
                DB::transaction(function () use ($user, $request) {
                    $user->name             = $request->name;
                    $user->email            = $request->email;
                    $user->username         = $request->username;
                    $user->userstatus         = $request->status;
//                    $user->contact_number   = $request->contact_number;
//                    $user->comment          = $request->comment;
                    if ($request->password){
                        $user->password          = Hash::make($request->password);
                    }
                    $user->roles()->detach();
                    $user->assignRole($request->userrole);
                    $user->save();
                });
                return $this->responseSuccess(['message'=>'User updated successfully']);
            } catch (Exception $e){
                if (config('app.debug')) {
                    throw new Exception('Exception::: '.$e->getMessage(), 400);
                }
                throw new Exception('Unable to save the data.', 400);
            }
        }
        return $this->responseError('User not found', 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = AdminUser::getByExternalId($id);
        if ($user){
            $user->roles()->detach();
            $user->delete();
            $this->responseSuccess(['message'=>'User removed successfully']);
        }
        return $this->responseError('Invalid customer', 401);
    }
}
