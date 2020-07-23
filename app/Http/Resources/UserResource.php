<?php

namespace App\Http\Resources;

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
//        return parent::toArray($request);
//        $additional = array();
//        $additional[]['role'] = $this->roles();
//        return array_combine(
//            parent::toArray($request),
//            $additional
//        );
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
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'role' => ($this->roles && isset($this->roles[0])) ? new RoleResource($this->roles[0]) : null,
        ];

         return $_Return;
    }
}
