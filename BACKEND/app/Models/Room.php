<?php

namespace App\Models;

use App\Models\Facility;
use App\Models\Payment;
use App\Models\User;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Room extends Model {
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
		'user_id',
		'photo_url',
		'name',
		'size',
		'price',
		'status',
	];

	public function user() {
		return $this->belongsTo(User::class);
	}

	public function facilities() {
		return $this->belongsToMany(Facility::class);
	}

	public function payment() {
		return $this->hasOne(Payment::class);
	}

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [
	];
}
