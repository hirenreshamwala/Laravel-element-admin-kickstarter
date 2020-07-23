<?php

namespace App\Http\Requests\User;

use App\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('user.add');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $userIds = User::role(User::getAdminRoles())->get()->pluck('id')->toArray();
        return [
            'name' => 'required',
            'email' => [
                'required',
                'email',
            ],
            'username' => [
                'required',
                Rule::unique('users', 'username')->whereIn('id', $userIds)
            ],
            'address' => '',
            'contact_number' => 'numeric',
            'password' => 'required|min:5|confirmed',
            'password_confirmation' => 'required|min:5',
            'userrole' => 'required'
        ];
    }
}
