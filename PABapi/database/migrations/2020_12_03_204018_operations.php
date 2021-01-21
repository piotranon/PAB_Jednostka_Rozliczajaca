<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Operations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operations', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('debited_bank_id');
            $table->unsignedBigInteger('credited_bank_id');

            $table->string('debited_account_number');
            $table->string('debited_name_and_address');

            $table->string('credited_account_number');
            $table->string('credited_name_and_address');

            $table->string('title');
            $table->float('amount', 10, 2, true);

            $table->timestamps();

            $table->unsignedBigInteger('status_id');

            $table->foreign('status_id')->references('id')->on('operation_status');
            $table->foreign('debited_bank_id')->references('id')->on('banks');
            $table->foreign('credited_bank_id')->references('id')->on('banks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('operations');
    }
}
