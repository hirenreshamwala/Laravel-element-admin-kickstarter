<?php

namespace Modules\Admin\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'exid' => $this->external_id,
            'name' => $this->name,
            'last_name' => $this->last_name,
            'username' => $this->username,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'contact_number' => $this->contact_number,
            'address' => $this->address,
            'state' => $this->state,
            'city' => $this->city,
            'register_date' => $this->register_date,
            'comment' => $this->comment,
			'status' => $this->userstatus,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
