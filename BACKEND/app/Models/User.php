<?php

namespace App\Models;

use App\Models\Complaint;
use App\Models\Room;
use App\Traits\Uuid;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject {
	use Authenticatable, Authorizable, Uuid;

	protected $guard_name = 'api';
	public $incrementing = false;

	protected $casts = [
		'is_active' => 'boolean',
	];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'photo_url', 'name', 'phone', 'role', 'is_active',
	];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password',
	];

	/**
	 * Get the identifier that will be stored in the subject claim of the JWT.
	 *
	 * @return mixed
	 */
	public function getJWTIdentifier() {
		// return $this->getKey();
		return $this->id;
	}

	/**
	 * Get the name of the unique identifier for the user.
	 *
	 * @return string
	 */
	public function getAuthIdentifierName() {
		// return $this->getKeyName();
		return 'id';
	}

	/**
	 * Return a key value array, containing any custom claims to be added to the JWT.
	 *
	 * @return array
	 */
	public function getJWTCustomClaims() {
		return [];
	}

	public function room() {
		return $this->hasOne(Room::class);
	}

	public function complaints() {
		return $this->hasMany(Complaint::class);
	}

	public function payment() {
		return $this->hasMany(Payment::class);
	}

}
