<?php

namespace App\Traits;

use Ramsey\Uuid\Uuid as RamseyUuid;

trait Uuid {
	public static function bootUuid() {
		static::creating(function ($model) {
			$model->id = RamseyUuid::uuid4();
		});
	}

	public static function findUuid($id) {
		return static::where('id', $id)->first();
	}
}
