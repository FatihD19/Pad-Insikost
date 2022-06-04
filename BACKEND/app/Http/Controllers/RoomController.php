<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller {
	/**
	 * Instantiate a new RoomController instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware('auth:api');
	}

	public function index() {

		$room = Room::with('user')->with('facilities')->get();
		return response()->json($room);
	}

	public function detail($id) {
		$room = Room::with('user')->with('facilities')->find($id);
		return response()->json($room);
	}

	public function create(Request $request) {
		$room = new Room;
		$room->user_id = $request->user_id;
		$room->photo_url = $request->photo_url;
		$room->name = $request->name;
		$room->size = $request->size;
		$room->price = $request->price;
		$room->status = $request->status;
		$room->save();

		$room->facilities()->attach($request->facilities_id);
		return response()->json($room);
	}

	public function edit(Request $request, $id) {
		$room = Room::with('facilities')->findOrFail($id);
		$last_facilities_id = [];
		foreach ($room->facilities as $facility) {
			array_push($last_facilities_id, $facility->id);
		}

		$room->photo_url = $request->input('photo_url');
		$room->user_id = $request->input('user_id');
		$room->name = $request->input('name');
		$room->size = $request->input('size');
		$room->price = $request->input('price');
		$room->status = $request->input('status');
		$room->save();

		$room->facilities()->detach($last_facilities_id);
		$room->facilities()->attach($request->facilities_id);
		return response()->json($room);
	}

	public function delete($id) {
		$room = Room::find($id);
		$room->delete();
		return response()->json('removed successfully');
	}

}
