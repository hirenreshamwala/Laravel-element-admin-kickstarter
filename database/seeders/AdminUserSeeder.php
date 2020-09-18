<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = AdminUser::create([
            'email' => 'admin@example.com',
            'username'=>'admin@example.com',
            'name' => Str::random(10),
            'password' => Hash::make('admin123'),
        ]);
        $user->assignRole('Super');
    }
}
