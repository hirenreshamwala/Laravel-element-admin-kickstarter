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
        $user = factory(User::class)->create(['email'=>'admin@xiontechnologies.in','username'=>'admin@xiontechnologies.in','password'=>bcrypt('passwd')]);
        $user->assignRole('Super Admin');
    }
}
