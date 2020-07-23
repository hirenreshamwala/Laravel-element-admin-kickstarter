<?php

namespace App\Http\Requests\Customer;

use App\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('customer.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = User::getByExternalId($this->exid);
        $userIds = User::role('Customer')->get()->pluck('id')->toArray();
        $rules = [
            'name' => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->whereIn('id', $userIds)->ignore($user->id)
            ],
            'username' => [
                'required',
                Rule::unique('users', 'username')->whereIn('id', $userIds)->ignore($user->id)
            ],
            'contact_number' => [
                'required',
                'numeric',
                Rule::unique('users', 'contact_number')->whereIn('id', $userIds)->ignore($user->id)
            ],
            'address' => ''
        ];
        if ($this->password){
            $rules['password'] = 'min:5|confirmed';
            $rules['password_confirmation'] = 'min:5';
        }

        return $rules;
    }
}
