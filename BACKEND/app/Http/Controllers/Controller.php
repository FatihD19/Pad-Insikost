<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController {
	protected function respondWithToken($token) {
		$user = User::with('room.facilities')->find(Auth::user()->id);
		return response()->json([
			'user' => $user,
			'access_token' => $token,
			'token_type' => 'bearer',
			// Auth::factory()->getTTL() - return Token's Time to Live in minutes (default=60)
			'expires_in' => Auth::factory()->getTTL() * 60 . " Seconds", // Convert time to live to seconds
		], 200);
	}
}
