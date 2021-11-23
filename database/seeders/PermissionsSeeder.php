<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['name' => 'admin']);
        Permission::create(['name' => 'edit']);
        Permission::create(['name' => 'create']);
        Permission::create(['name' => 'remove']);
        Permission::create(['name' => 'view']);

        $adminRole = Role::create(['name' => 'administrator']);
        $userWithPermissionRole = Role::create(['name' => 'client']);

        $adminRole->givePermissionTo(['admin', 'edit', 'create', 'remove', 'view']);
        $userWithPermissionRole->givePermissionTo(['edit', 'create', 'remove', 'view']);
    }
}
