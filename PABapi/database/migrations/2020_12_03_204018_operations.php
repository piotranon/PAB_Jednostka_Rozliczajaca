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
            $table->integer('type');
            $table->string('payer_account_number');
            $table->string('recipient_account_number');
            $table->float('amount', 10, 2, true);
            $table->timestamps();

            $table->unsignedBigInteger('status_id');
            $table->unsignedBigInteger('account_id');

            $table->foreign('status_id')->references('id')->on('operation_status');
            $table->foreign('account_id')->references('id')->on('accounts');
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
