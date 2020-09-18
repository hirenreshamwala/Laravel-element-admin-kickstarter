<?php

namespace Modules\Admin\Http\Requests\Customer;

use App\Models\User;
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
        $user = User::findByExternalId($this->exid);
        $userIds = User::get()->pluck('id')->toArray();
        $rules = [
            'name' => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->whereIn('id', $userIds)->ignore($user->id)
            ],
            'contact_number' => [
                'required',
                'numeric',
                Rule::unique('users', 'contact_number')->whereIn('id', $userIds)->ignore($user->id)
            ],
            'address' => ''
        ];
        if ($this->password){
            $rules['password'] = 'min:6|confirmed';
            $rules['password_confirmation'] = 'min:6';
        }

        return $rules;
    }
}
