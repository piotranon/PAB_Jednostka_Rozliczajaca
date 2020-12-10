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
            'name' => "odebrano",
        ]);
        DB::table('operation_status')->insert([
            'name' => "wysłano",
        ]);
        DB::table('operation_status')->insert([
            'name' => "zawrocono",
        ]);
        DB::table('operation_status')->insert([
            'name' => "zakonczono",
        ]);

        // DB::table('banks')->insert([
        //     'name' => Str::random(10),
        //     'bank_number' => "10902402"
        // ]);

        // DB::table('accounts')->insert([
        //     'account_number' => "10902402",
        //     'bank_id' => 1
        // ]);
    }
}
