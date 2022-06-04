<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacilityRoomTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('facility_room', function (Blueprint $table) {
			$table->bigIncrements('id')->unique();

			$table->string('facility_id', 36);
			$table->foreign('facility_id')->references('id')->on('facilities')->onDelete('cascade');
			$table->string('room_id', 36);
			$table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('facilities_rooms');
	}
}
