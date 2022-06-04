<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableComplaints extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('complaints', function (Blueprint $table) {
			$table->uuid('id')->unique();
			$table->primary('id');

			$table->string('user_id', 36);
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->string('photo_url', 100)->nullable();
			$table->text('content');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('complaints');
	}
}
