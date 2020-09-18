<?php

namespace Modules\Admin\Http\Requests\Customer;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('customer.add');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $userIds = User::get()->pluck('id')->toArray();
        return [
            'name' => 'required',
            'email' => [
                'required',
                Rule::unique('users', 'email')->whereIn('id', $userIds)
            ],
            'contact_number' => [
                'required',
                'numeric',
                Rule::unique('users', 'contact_number')->whereIn('id', $userIds)
            ],
            'address' => '',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6'
        ];
    }
}
