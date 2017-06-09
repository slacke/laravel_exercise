<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/',function(){
	return view('react');
});



/*
Route::get('/', 'TaskController@index');
*/

/**
 * Add New Task
 */
Route::post('/task','TaskController@newTask' );
	


/**
 * Delete Task
 */	
Route::delete('/task/{task}', 'TaskController@delete');




/*edit page*/

Route::get('/task/{task}/edit', 'TaskController@startEdit');


/*edit task*/
Route::post('/task/{task}/edited', 'TaskController@edit');







