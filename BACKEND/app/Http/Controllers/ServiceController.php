<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid as RamseyUuid;

class ServiceController extends Controller {
	/**
	 * Instantiate a new ServiceController instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware('auth:api');
	}

	public function upload_photo(Request $request) {
		$this->validate($request, [
			'photo' => 'required|image',
		]);

		try {
			$file_name = RamseyUuid::uuid4();
			$request->file('photo')->move('photo/', $file_name . $request->file('photo')->extension());
			return response()->json([
				'message' => 'Upload success!',
				'photo_url' => url('photo/' . $file_name),
			]);
		} catch (Exception $error) {
			return response()->json([
				'message' => 'Failed to upload photo!',
				'error' => $error,
			]);
		}
	}
}
