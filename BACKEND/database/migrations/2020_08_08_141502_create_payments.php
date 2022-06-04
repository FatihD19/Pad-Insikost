<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayments extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('payments', function (Blueprint $table) {
			$table->uuid('id')->unique();
			$table->primary('id');

			$table->string('photo_url', 100)->nullable();
			$table->string('user_id', 36);
			$table->string('room_id', 36);
			$table->integer('nominal');
			$table->integer('uang_diterima');
			$table->integer('uang_kembalian')->nullable();
			$table->string('month', 2);
			$table->string('year', 4);

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('payments');
	}
}
