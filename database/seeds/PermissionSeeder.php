<?php

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
        Permission::create(['name' => 'dashboard.view']);
        Permission::create(['name' => 'user.list']);
        Permission::create(['name' => 'user.add']);
        Permission::create(['name' => 'user.update']);
        Permission::create(['name' => 'user.delete']);
        Permission::create(['name' => 'role.list']);
        Permission::create(['name' => 'role.add']);
        Permission::create(['name' => 'role.update']);
        Permission::create(['name' => 'role.delete']);
        
        Permission::create(['name' => 'customer.list']);
        Permission::create(['name' => 'customer.add']);
        Permission::create(['name' => 'customer.update']);
        Permission::create(['name' => 'customer.delete']);

        Role::create(['name' => 'Super Admin']);
        Role::create(['name' => 'Customer']);

        $role = Role::create(['name' => 'Admin']);
        $role->givePermissionTo(Permission::findByName('dashboard.view'));
        $role->givePermissionTo(Permission::findByName('user.list'));
        $role->givePermissionTo(Permission::findByName('user.add'));
        $role->givePermissionTo(Permission::findByName('user.update'));
        $role->givePermissionTo(Permission::findByName('user.delete'));
        $role->givePermissionTo(Permission::findByName('role.list'));
        $role->givePermissionTo(Permission::findByName('role.add'));
        $role->givePermissionTo(Permission::findByName('role.update'));
        $role->givePermissionTo(Permission::findByName('role.delete'));

        $role->givePermissionTo(Permission::findByName('customer.list'));
        $role->givePermissionTo(Permission::findByName('customer.add'));
        $role->givePermissionTo(Permission::findByName('customer.update'));
        $role->givePermissionTo(Permission::findByName('customer.delete'));

    }
}
