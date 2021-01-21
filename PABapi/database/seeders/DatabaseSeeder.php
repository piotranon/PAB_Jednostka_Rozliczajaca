<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('operation_status')->insert([
            'name' => "Received",
        ]);
        DB::table('operation_status')->insert([
            'name' => "Sent",
        ]);
    }
}
