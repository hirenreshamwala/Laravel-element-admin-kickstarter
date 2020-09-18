<?php

namespace Modules\Admin\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $_Return = [
            'id' => $this->id,
            'exid' => $this->external_id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'contact_number' => $this->contact_number,
            'register_date' => $this->register_date,
            'comment' => $this->comment,
            'status' => $this->userstatus,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'role' => ($this->roles) ? new RoleResource($this->roles->first()) : null,
        ];

         return $_Return;
    }
}
