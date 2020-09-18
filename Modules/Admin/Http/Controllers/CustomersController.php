<?php

namespace Modules\Admin\Http\Controllers;

use Modules\Admin\Http\Requests\Customer\StoreCustomerRequest;
use Modules\Admin\Http\Requests\Customer\UpdateCustomerRequest;
use App\Models\User;
use Modules\Admin\Http\Resources\CustomerResource;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Webpatser\Uuid\Uuid;

class CustomersController extends CommonController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $pageNumber = $request->input('page', 1);
        $noOfRows = $request->input('rows', 20);

        $users = User::when(request('s'), function ($query) {
                return $query->where('email', 'like', '%'.request('s').'%')
                    ->orWhere('name', 'like', '%'.request('s').'%');
            })
            ->when(request('sort') || request('order'), function ($query) {
                $sort_by = request('sort', 'id');
                $sort_order = (request('order', 'd') == 'a') ? 'asc' : 'desc';
                return $query->orderBy($sort_by,$sort_order);
            })
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
     * @param StoreCustomerRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function store(StoreCustomerRequest $request)
    {
        try{
            DB::transaction(function () use ($request) {
                User::create(array(
                    'external_id'=>Uuid::generate()->string,
                    'name' => $request->name,
                    'email' => $request->email,
                    'contact_number' => $request->contact_number,
                    'address' => $request->address,
                    'state' => $request->state,
                    'city' => $request->city,
                    'comment' => $request->comment,
                    'email_verified_at' => Carbon::now(),
                    'password' => Hash::make($request->password),
                ));
            });
            return $this->responseSuccess(['message'=>'User created successfully']);
        } catch (Exception $e){
            if (config('app.debug')) {
                throw new Exception('Exception::: '.$e->getMessage(), 400);
            }
            throw new Exception('Unable to save the data.', 400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
	 */
    public function show($id)
    {
        $user = User::findByExternalId($id);
        if ($user){
            return new CustomerResource($user);
        }
        return $this->responseError('Invalid customer', 404);
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
     * @param UpdateCustomerRequest $request
     * @param string $id
     * @return JsonResponse
     * @throws Exception
     */
    public function update($id, UpdateCustomerRequest $request)
    {
        $user = User::findByExternalId($id);
        if ($user){
            try{
                DB::transaction(function () use ($user, $request) {
                    $user->name = $request->name;
                    $user->email = $request->email;
                    $user->contact_number = $request->contact_number;
                    $user->address = $request->address;
                    $user->state = $request->state;
                    $user->city = $request->city;
                    $user->comment = $request->comment;
                    if ($request->password) {
                        $user->password = Hash::make($request->password);
                    }
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
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $user = User::findByExternalId($id);
        if ($user){
            $user->delete();
            return $this->responseSuccess(['message'=>'User removed successfully']);
        }
        return $this->responseError('Invalid customer', 401);
    }
}
