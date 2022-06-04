<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
 */

$router->get('/', function () use ($router) {
	return $router->app->version();
});

// API route group
$router->group(['prefix' => 'api'], function () use ($router) {

	$router->group(['prefix' => 'users'], function () use ($router) {
		$router->get('/', 'UserController@users');
		$router->get('/me', 'UserController@me');
		$router->get('/{id}', 'UserController@user');

		$router->post('register', 'AuthController@register');
		$router->post('login', 'AuthController@login');
		$router->post('logout', 'AuthController@logout');
		$router->post('refresh', 'AuthController@refresh');

		$router->put('/change-password', 'UserController@change_password');
		$router->put('/{id}', 'UserController@edit');

		$router->delete('/{id}', 'UserController@delete');

	});

	$router->group(['prefix' => 'dashboard'], function () use ($router) {
		$router->get('/charts', 'DashboardController@get_charts');
	});

	$router->group(['prefix' => 'facilities'], function () use ($router) {
		$router->get('/', 'FacilityController@index');
		$router->get('/{id}', 'FacilityController@detail');

		$router->post('/', 'FacilityController@create');

		$router->put('/{id}', 'FacilityController@edit');

		$router->delete('/{id}', 'FacilityController@delete');
	});

	$router->group(['prefix' => 'rooms'], function () use ($router) {
		$router->get('/', 'RoomController@index');
		$router->get('/{id}', 'RoomController@detail');

		$router->post('/', 'RoomController@create');

		$router->put('/{id}', 'RoomController@edit');

		$router->delete('/{id}', 'RoomController@delete');
	});

	$router->group(['prefix' => 'payments'], function () use ($router) {
		$router->get('/', 'PaymentController@index');
		$router->get('/user-payment-status', 'PaymentController@user_payment_status');
		$router->get('/{id}', 'PaymentController@detail');

		$router->post('/', 'PaymentController@create');

		$router->put('/{id}', 'PaymentController@edit');

		$router->put('edit-status-rejected/{id}', 'PaymentController@editStatusRejected');

		$router->put('edit-status-accepted/{id}', 'PaymentController@editStatusAccepted');

		$router->delete('/{id}', 'PaymentController@delete');
	});

	$router->group(['prefix' => 'news'], function () use ($router) {
		$router->get('/', 'NewsController@index');
		$router->get('/{id}', 'NewsController@detail');

		$router->post('/', 'NewsController@create');
		$router->post('/{id}/send', 'NewsController@send');

		$router->put('/{id}', 'NewsController@edit');

		$router->delete('/{id}', 'NewsController@delete');
	});

	$router->group(['prefix' => 'complaints'], function () use ($router) {
		$router->get('/', 'ComplaintController@index');
		$router->get('/{id}', 'ComplaintController@detail');
		$router->get('/user/{user_id}', 'ComplaintController@list_complaints_by_user');

		$router->post('/', 'ComplaintController@create');

		$router->put('/{id}', 'ComplaintController@edit');

		$router->delete('/{id}', 'ComplaintController@delete');
	});

	$router->group(['prefix' => 'services'], function () use ($router) {
		$router->post('/upload-photo', 'ServiceController@upload_photo');
	});

});
