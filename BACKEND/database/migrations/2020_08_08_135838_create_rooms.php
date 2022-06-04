<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRooms extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('rooms', function (Blueprint $table) {
			$table->uuid('id')->unique();
			$table->primary('id');

			$table->string('user_id', 36)->nullable();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->string('photo_url', 100)->nullable();
			$table->string('name', 100);
			$table->string('size', 20);
			$table->integer('price');
			$table->string('status', 50);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('rooms');
	}
}
