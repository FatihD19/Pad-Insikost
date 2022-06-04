<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;

class FacilityController extends Controller {
	/**
	 * Instantiate a new FacilityController instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware('auth:api');
	}

	public function index() {

		$facility = Facility::all();
		return response()->json($facility);
	}

	public function detail($id) {
		$facility = Facility::find($id);
		return response()->json($facility);
	}

	public function create(Request $request) {
		$facility = new Facility;
		$facility->name = $request->name;

		$facility->save();
		return response()->json($facility);
	}

	public function edit(Request $request, $id) {
		$facility = Facility::find($id);
		$facility->name = $request->input('name');

		$facility->save();
		return response()->json($facility);
	}

	public function delete($id) {
		$facility = Facility::find($id);
		$facility->delete();
		return response()->json('removed successfully');
	}

}
