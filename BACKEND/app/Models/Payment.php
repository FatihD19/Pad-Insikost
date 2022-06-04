<?php

namespace App\Models;

use App\Models\Room;
use App\Models\User;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model {
	use Uuid;

	protected $guard_name = 'api';
	public $incrementing = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'id',
		'photo_url',
		'user_id',
		'room_id',
		'nominal',
		'uang_diterima',
		'uang_kembalian',
		'month',
		'year',
		'status',
	];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [
	];

	public function user() {
		return $this->belongsTo(User::class);
	}

	public function room() {
		return $this->belongsTo(Room::class);
	}

}
