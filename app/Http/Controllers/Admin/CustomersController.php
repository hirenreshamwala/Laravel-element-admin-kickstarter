<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\CustomerResource;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class CustomersController extends Controller
{
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

        $users = User::role('Customer')
            ->where(function($query ) use ($search)
            {
                if($search){
                    $query->where('email', 'like', '%'.$search.'%')
                        ->orWhere('name', 'like', '%'.$search.'%');
                }
            })
            ->orderBy($sort_by,$sort_order)
            ->paginate($noOfRows,['*'],'page',$pageNumber);
        return CustomerResource::collection($users);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userIds = User::role('Customer')->get()->pluck('id')->toArray();

        $request->validate([
            'name'=>'required',
            'password'=>'required',
            'email' => [
                'required',
                Rule::unique('users', 'email')->whereIn('id', $userIds)
            ]
        ]);
        try{

            DB::transaction(function () use ($request) {
                $user = User::create(array(
                    'name' => $request->name,
                    'last_name' => $request->last_name,
                    'username' => $request->email,
                    'email' => $request->email,
                    'contact_number' => $request->contact_number,
                    'address' => $request->address,
                    'state' => $request->state,
                    'city' => $request->city,
                    'comment' => $request->comment,
                    'email_verified_at' => date('Y-m-d H:i:s'),
//                    'register_date' => date('Y-m-d H:i:s'),
                    'password' => Hash::make($request->password),
                ));
                $user->assignRole('Customer');
            });
        } catch (\Exception $e){
            if (config('app.debug')) {
                throw new \Exception('Exception::: '.$e->getMessage(), 400);
            }
            throw new \Exception('Unable to save the data.', 400);
        }
        return array(
            'status' => 'success',
            'message' => 'User created successfully'
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
        return new CustomerResource(User::role('Customer')->find($id));
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
    public function update(User $user, Request $request)
    {
        $userIds = User::role('Customer')->get()->pluck('id')->toArray();
        $request->validate([
            'name'=>'required',
            'email' => [
                'required',
                Rule::unique('users', 'email')->whereIn('id', $userIds)->ignore($user->id)
            ]
        ]);

        if ($user){
            DB::transaction(function () use ($user, $request) {
                $user->name = Input::get('name');
                $user->last_name = Input::get('last_name');
                $user->email = Input::get('email');
                $user->username = Input::get('email');
                $user->contact_number = Input::get('contact_number');
                $user->address = Input::get('address');
                $user->state = Input::get('state');
                $user->city = Input::get('city');
                $user->comment = Input::get('comment');
                if ($request->password) {
                    $user->password = Hash::make(Input::get('password'));
                }
                $user->roles()->detach();
                $user->assignRole(Input::get('userrole'));
                $user->save();
            });
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
