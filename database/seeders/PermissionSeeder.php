<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Permission::create(['name' => 'dashboard.view', 'guard_name' => 'admin']);
        Permission::create(['name' => 'user.list', 'guard_name' => 'admin']);
        Permission::create(['name' => 'user.add', 'guard_name' => 'admin']);
        Permission::create(['name' => 'user.update','guard_name'=>'admin']);
        Permission::create(['name' => 'user.delete','guard_name'=>'admin']);
        Permission::create(['name' => 'role.list','guard_name'=>'admin']);
        Permission::create(['name' => 'role.add','guard_name'=>'admin']);
        Permission::create(['name' => 'role.update','guard_name'=>'admin']);
        Permission::create(['name' => 'role.delete','guard_name'=>'admin']);

        Permission::create(['name' => 'customer.list','guard_name'=>'admin']);
        Permission::create(['name' => 'customer.add','guard_name'=>'admin']);
        Permission::create(['name' => 'customer.update','guard_name'=>'admin']);
        Permission::create(['name' => 'customer.delete','guard_name'=>'admin']);

        Role::create(['name' => 'Super','guard_name'=>'admin']);

        $role = Role::create(['name' => 'Admin','guard_name'=>'admin']);
        $role->givePermissionTo(Permission::findByName('dashboard.view','admin'));

        $role->givePermissionTo(Permission::findByName('user.list','admin'));
        $role->givePermissionTo(Permission::findByName('user.add','admin'));
        $role->givePermissionTo(Permission::findByName('user.update','admin'));
        $role->givePermissionTo(Permission::findByName('user.delete','admin'));

        $role->givePermissionTo(Permission::findByName('role.list','admin'));
        $role->givePermissionTo(Permission::findByName('role.add','admin'));
        $role->givePermissionTo(Permission::findByName('role.update','admin'));
        $role->givePermissionTo(Permission::findByName('role.delete','admin'));

        $role->givePermissionTo(Permission::findByName('customer.list','admin'));
        $role->givePermissionTo(Permission::findByName('customer.add','admin'));
        $role->givePermissionTo(Permission::findByName('customer.update','admin'));
        $role->givePermissionTo(Permission::findByName('customer.delete','admin'));

    }
}
