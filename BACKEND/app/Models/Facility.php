<?php

namespace App\Models;

use App\Models\Room;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Facility extends Model {
	use Uuid;

	protected $guard_name = 'api';
	public $incrementing = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name',
	];

	public function rooms() {
		return $this->belongsToMany(Room::class);
	}

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [
	];
}
