<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {
	/**
	 * Instantiate a new UserController instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware('auth:api');
	}

	/**
	 * Get the authenticated User.
	 *
	 * @return Response
	 */
	public function me() {
		$user = User::with('room')->find(Auth::user()->id);
		return response()->json($user, 200);
	}

	/**
	 * Get all User.
	 *
	 * @return Response
	 */
	public function users() {
		$users = User::with('room')->get();
		return response()->json($users, 200);
	}

	/**
	 * Get one user.
	 *
	 * @return Response
	 */
	public function user($id) {
		try {
			$user = User::with('room.facilities')->find($id);

			return response()->json($user, 200);

		} catch (\Exception $e) {

			return response()->json(['error' => 'user not found!'], 404);
		}

	}

	public function edit(Request $request, $id) {
		$user = User::find($id);
		$user->name = $request->input('name');
		$user->phone = $request->input('phone');
		$user->role = $request->input('role');
		$user->photo_url = $request->input('photo_url');

		$user->save();
		return response()->json($user);
	}

	public function change_password(Request $request) {
		$user = User::find(Auth::user()->id);
		$user->password = app('hash')->make($request->input('password'));

		$user->save();
		return response()->json($user);
	}

	public function delete($id) {
		$user = User::find($id);
		$user->delete();
		return response()->json('removed successfully');
	}

}
