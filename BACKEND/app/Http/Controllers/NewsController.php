<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class NewsController extends Controller
{
	/**
	 * Instantiate a new NewsController instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth:api');
	}

	public function index()
	{

		$newss = News::all();
		return response()->json($newss);
	}

	public function detail($id)
	{
		$news = News::find($id);
		return response()->json($news);
	}

	public function create(Request $request)
	{
		$news = new News;
		$news->content = $request->content;

		$news->save();
		return response()->json($news);
	}

	public function edit(Request $request, $id)
	{
		$news = News::find($id);
		$news->content = $request->input('content');

		$news->save();
		return response()->json($news);
	}

	public function send(Request $request, $id)
	{
		$timestamps = date('Y-m-d H:i:s');

		$news = News::find($id);

		$penghuni = User::with('room')->where('role', 'PENGHUNI')->get();
		$penghuni_aktif = $penghuni->filter(function ($value, $key) {
			return $value['room'] != null;
		});

		// // SEND SMS
		// $params = array(
		// 	'user' => 'zericki_api',
		// 	'password' => 'ZerickiApi7!',
		// 	'SMSText' => $news->content,
		// 	'output' => 'json',
		// );

		foreach ($penghuni_aktif as $pa) {
			// // SEND SMS
			// $url = 'http://api.nusasms.com/api/v3/sendsms/plain?user=' . $params['user'] . '&password=' . $params['password'] . '&SMSText=' . $params['SMSText'] . '&GSM=' . $pa->phone . '&output=' . $params['output'];
			// $client = new Client();
			// $res = $client->request('GET', $url);

			// SEND WHATSAPP
			$url = 'https://api.nusasms.com/nusasms_api/1.0/whatsapp/message';
			$client = new Client();
			$res = $client->request('POST', $url, [
				'headers' => [
					"APIKey" => "F7172689D2A6295F82205089E0115329",
					"Content-Type" => "application/json"
				],
				'json' => [
					'destination' => $pa->phone,
					'message' => $news->content
				]
			]);
		}

		$news->last_sent = $timestamps;
		$news->save();

		return response()->json([
			'message' => 'News has been sent! at : ' . $timestamps,
		]);
	}

	public function delete($id)
	{
		$news = News::find($id);
		$news->delete();
		return response()->json('removed successfully');
	}
}
