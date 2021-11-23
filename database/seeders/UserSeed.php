<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'administrador',
            'username' => 'admin',
            'email' => 'admbibliotecadtl2021@gmail.com',
            'password' => Hash::make('admin2021'),
        ]);
    }
}
