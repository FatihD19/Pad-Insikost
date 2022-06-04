<?php

namespace App\Business;

use App\Models\User as UserModel;
use Illuminate\Support\Facades\Hash;

class User extends UserModel {

	/**
	 * Register a new user
	 */
	public static function register($name, $phone, $role, $password, $photo_url) {
		$user = new UserModel;
		$user->name = $name;
		$user->phone = $phone;
		$user->role = $role;
		$user->password = Hash::make($password);
		$user->photo_url = $photo_url;

		$user->save();

		return $user;
	}

	/**
	 * Log into user with corresponding e-mail and password
	 */
	public static function login($phone, $password) {
		$credentials = ['phone' => $phone, 'password' => $password];
		$access_token = \Auth::guard('api')->attempt($credentials);
		return $access_token ? $access_token : null;
	}

}
