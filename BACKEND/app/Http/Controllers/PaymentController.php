<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller {
	/**
	 * Instantiate a new PaymentController instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware('auth:api');
	}

	public function index() {
		$payment = Payment::with('user')->with('room')->get();
		return response()->json($payment);
	}

	public function detail($id) {
		$payment = Payment::with('user')->with('room')->find($id);
		return response()->json($payment);
	}

	public function user_payment_status() {
		$id = Auth::user()->id;
		$this_month = date('n');
		$this_year = date('Y');

		$payment = Payment::where('month', $this_month)->where('year', $this_year)->where('user_id', $id)->count() > 0;
		return response()->json($payment);
	}

	public function create(Request $request) {
		$payment = new Payment;
		$payment->photo_url = $request->photo_url;
		$payment->user_id = $request->user_id;
		$payment->room_id = $request->room_id;
		$payment->nominal = $request->nominal;
		$payment->uang_diterima = $request->uang_diterima;
		$payment->uang_kembalian = $request->uang_diterima - $request->nominal;
		$payment->month = $request->month;
		$payment->year = $request->year;
		$payment->status = null;
		

		$payment->save();
		return response()->json($payment);
	}

	public function edit(Request $request, $id) {
		$payment = Payment::find($id);
		$payment->photo_url = $request->input('photo_url');
		$payment->user_id = $request->input('user_id');
		$payment->room_id = $request->input('room_id');
		$payment->nominal = $request->input('nominal');
		$payment->uang_diterima = $request->input('uang_diterima');
		$payment->uang_kembalian = $request->input('uang_diterima') - $request->input('nominal');
		$payment->month = $request->input('month');
		$payment->year = $request->input('year');

		$payment->save();
		return response()->json($payment);
	}

	//ubah status payment jadi rejected
	public function editStatusRejected($id) {
		$payment = Payment::find($id);
		$payment->status = 'rejected';
		$payment->save();
		return response()->json($payment);
	}
	//ubah status payment jadi accepted
	public function editStatusAccepted($id) {
		$payment = Payment::find($id);
		$payment->status = 'accepted';
		$payment->save();
		return response()->json($payment);
	}

	public function delete($id) {
		$payment = Payment::find($id);
		$payment->delete();
		return response()->json('removed successfully');
	}

}
