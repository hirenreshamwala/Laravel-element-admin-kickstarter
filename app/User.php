<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Models\Role;
use Wildside\Userstamps\Userstamps;

use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Userstamps;
    use Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'external_id',
        'name',
        'last_name',
        'username',
        'email',
        'password',
        'contact_number',
        'address',
        'post_code',
        'place',
        'comment',
        'register_date',
        'last_login_ip',
        'last_login_at',
        'email_verified_at',
        'verified'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'pivot'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function getByExternalId($id){
        return User::whereExternalId($id)->first();
    }

    public static function getAdminRoles(){
        return array_values(array_diff( Role::all()->pluck('name')->toArray(), ['Super Admin','Customer'] ));
    }
}
