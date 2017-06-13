<?php


/*    i'll mix laravel and react project so i might be confuse

	  because i've short-term memory i have something to reference when i forgot
     */



Route::get('/',function(){
	return view('react');
});


Route::get('/getData','TaskController@getData');


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







