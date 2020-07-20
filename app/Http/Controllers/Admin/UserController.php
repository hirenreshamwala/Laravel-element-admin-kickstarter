<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public $roles;

    public function __construct()
    {
        $this->roles = array_values(array_diff( Role::all()->pluck('name')->toArray(), ['Super Admin','Customer'] ));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
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

        $users = User::role($this->roles)
            ->whereNotIn('id',[Auth::user()->id])
            ->where(function($query ) use ($search)
            {
                if($search){
                    $query->where('email', 'like', '%'.$search.'%')
                    ->orWhere('name', 'like', '%'.$search.'%');
                }
            })
            ->orderBy($sort_by,$sort_order)
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userIds = User::role($this->roles)->get()->pluck('id')->toArray();
        $request->validate([
            'name'=>'required',
            'password'=>'required',
            'email' => [
                'required',
                Rule::unique('users', 'email')->whereIn('id', $userIds)
            ]
        ]);

        $user = User::where('email','=',$request->email)->orWhere('username',$request->username)->first();
        if ($user){
            if ($user->email == $request->email){
                return array(
                    'status' => 'error',
                    'message' => 'Email already exist'
                );
            } else if($user->username == $user->username) {
                return array(
                    'status' => 'error',
                    'message' => 'Username already exist'
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'User already exist'
                );
            }
        } else {
            $user = User::create(array(
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'contact_number' => $request->contact_number,
                'comment' => $request->comment,
                'password' => Hash::make($request->password),
            ));
            $user->assignRole(Input::get('userrole'));
            return array(
                'status' => 'success',
                'message' => 'User created successfully'
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new UserResource(User::with('roles')->find($id));

//        return User::with('roles')->find($id);
        return User::with([
            'roles'  => function ($query) {
                $query->select(['id', 'name'])->first();
            }
        ])->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return User::with([
            'roles'  => function ($query) {
                $query->select(['id', 'name'])->first();
            }
        ])->find($id);
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
        $user = User::find($id);
        if ($user){
            $user->name             = Input::get('name');
            $user->email            = Input::get('email');
            $user->username         = Input::get('username');
            $user->contact_number   = Input::get('contact_number');
            $user->comment          = Input::get('comment');
            if ($request->password){
                $user->password          = Hash::make(Input::get('password'));
            }
            $user->roles()->detach();
            $user->assignRole(Input::get('userrole'));
            $user->save();
        }

        return array(
            'status' => 'success',
            'message' => 'User created successfully'
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
        //
    }
}
