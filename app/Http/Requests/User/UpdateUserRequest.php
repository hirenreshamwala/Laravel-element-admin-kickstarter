<?php

namespace App\Http\Requests\User;

use App\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('user.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = User::getByExternalId($this->exid);
        $userIds = User::role(User::getAdminRoles())->get()->pluck('id')->toArray();
        $rules = [
            'name' => 'required',
            'email' => [
                'required',
                'email',
            ],
            'username' => [
                'required',
                Rule::unique('users', 'username')->whereIn('id', $userIds)->ignore($user->id)
            ],
            'address' => '',
            'contact_number' => 'numeric',
            'userrole' => 'required'
        ];
        if ($this->password){
            $rules['password'] = 'min:5|confirmed';
            $rules['password_confirmation'] = 'min:5';
        }

        return $rules;
    }
}
