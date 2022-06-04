<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\User;
use Illuminate\Http\Request;

class ComplaintController extends Controller {
	/**
	 * Instantiate a new ComplaintController instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware('auth:api');
	}

	public function index() {

		$complaint = Complaint::with('user')->get();
		return response()->json($complaint);
	}

	public function detail($id) {
		$complaint = Complaint::with('user')->find($id);
		return response()->json($complaint);
	}

	public function list_complaints_by_user($user_id) {
		$complaints = User::with('complaints')->find($user_id)->complaints;
		return response()->json($complaints, 200);
	}

	public function create(Request $request) {
		$complaint = new Complaint;
		$complaint->user_id = $request->user_id;
		$complaint->photo_url = $request->photo_url;
		$complaint->content = $request->content;

		$complaint->save();
		return response()->json($complaint);
	}

	public function edit(Request $request, $id) {
		$complaint = Complaint::find($id);
		$complaint->user_id = $request->input('user_id');
		$complaint->photo_url = $request->input('photo_url');
		$complaint->content = $request->input('content');

		$complaint->save();
		return response()->json($complaint);
	}

	public function delete($id) {
		$complaint = Complaint::find($id);
		$complaint->delete();
		return response()->json('removed successfully');
	}

}
