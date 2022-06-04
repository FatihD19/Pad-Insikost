<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\Payment;
use App\Models\Room;
use App\Models\User;

class DashboardController extends Controller {
	/**
	 * Instantiate a new DashboardController instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware('auth:api');
	}

	public function get_charts() {

		$penghuni = User::where('role', 'PENGHUNI')->get()->count();
		$rooms = Room::all()->count();
		$facilities = Facility::all()->count();
		$payments = Payment::all()->sum('nominal');

		$year = date('Y');
		$yearly_charts = [];

		for ($i = 1; $i <= 12; $i++) {
			array_push($yearly_charts, Payment::where('month', $i)->where('year', $year)->get()->sum('nominal'));
		}

		return response()->json([
			'count' => [
				'penghuni' => $penghuni,
				'rooms' => $rooms,
				'facilities' => $facilities,
				'payments' => $payments,
			],
			'chart' => $yearly_charts,
		]);
	}
}
