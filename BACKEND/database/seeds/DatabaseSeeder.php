<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid as RamseyUuid;

class DatabaseSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$user_id_pemilik = RamseyUuid::uuid4();
		$user_id_penghuni = 'dd864091-1f79-45fa-b75b-50b7c15efd52';
		$facility_id = RamseyUuid::uuid4();
		$room_id = RamseyUuid::uuid4();
		$facility_room_id = RamseyUuid::uuid4();
		$payment_id = RamseyUuid::uuid4();
		$complaint_id = RamseyUuid::uuid4();
		$news_id = RamseyUuid::uuid4();

		// Create Users
		DB::table('users')->insert([
			'id' => $user_id_pemilik,
			'photo_url' => 'https://alfin.jpg',
			'name' => 'alfin',
			'phone' => '62895411499533',
			'role' => 'PEMILIK',
			'password' => Hash::make('alfin123'),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s'),
		]);

		DB::table('users')->insert([
			'id' => $user_id_penghuni,
			'photo_url' => 'https://ayu.jpg',
			'name' => 'ayu',
			'phone' => '6281383688300',
			'role' => 'PENGHUNI',
			'password' => Hash::make('ayu123'),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s'),
		]);

		// Create Facilities
		DB::table('facilities')->insert([
			'id' => $facility_id,
			'name' => 'Wifi',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s'),
		]);

		// Create Rooms
		DB::table('rooms')->insert([
			'id' => $room_id,
			'user_id' => $user_id_penghuni,
			'photo_url' => 'http://kamar.jpg',
			'name' => 'Kamar A',
			'size' => '10 x 10 Meter',
			'price' => 250000,
			'status' => 'TERISI',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s'),
		]);

		// Create Facility Room
		DB::table('facility_room')->insert([
			'room_id' => $room_id,
			'facility_id' => $facility_id,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s'),
		]);

		// Create Payments
		DB::table('payments')->insert([
			'id' => $payment_id,
			'photo_url' => 'http://struk.jpg',
			'user_id' => $user_id_penghuni,
			'room_id' => $room_id,
			'nominal' => 250000,
			'uang_diterima' => 300000,
			'uang_kembalian' => 50000,
			'month' => '1',
			'year' => '2020',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s'),
		]);

		// Create News
		DB::table('news')->insert([
			'id' => $news_id,
			'content' => 'Selamat Pagi!',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s'),
		]);

		// Create Complaints
		DB::table('complaints')->insert([
			'id' => $complaint_id,
			'user_id' => $user_id_penghuni,
			'photo_url' => 'https://penghuni.jpg',
			'content' => 'Wifi nya mati nih..',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s'),
		]);
	}
}
