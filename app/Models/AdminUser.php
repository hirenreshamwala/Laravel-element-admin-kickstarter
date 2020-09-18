<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;
use XT\ExternalId\ExternalIdOptions;
use XT\Userstamps\Userstamps;
use XT\ExternalId\HasExternalId;
use Laravel\Sanctum\HasApiTokens;

class AdminUser extends Authenticatable
{
	use HasApiTokens;
    use HasFactory;
    use Userstamps;
    use HasRoles;
    Use HasExternalId;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'external_id',
        'name',
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

//    protected static function boot()
//    {
//        parent::boot();
//        static::saving(function ($model) {
//            $model->slug = str_slug($model->title);
//        });
//    }

    public static function getByExternalId($id){
        return AdminUser::whereExternalId($id)->first();
    }

    public static function getAdminRoles(){
        return array_values(array_diff( Role::all()->pluck('name')->toArray(), ['Super'] ));
    }

    public function getExternalIdOptions(): ExternalIdOptions
    {
        return ExternalIdOptions::create()->saveExternalIdTo('external_id');
    }
}
