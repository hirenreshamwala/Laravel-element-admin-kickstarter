<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = factory(User::class)->create(['email'=>'admin@example.com','username'=>'admin@example.com','password'=>bcrypt('admin123')]);
        $user->assignRole('Super Admin');
    }
}
