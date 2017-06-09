<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Validator;
use App\Task;

class TaskController extends Controller
{
	public function index(){
	    $tasks = task::orderBy('created_at', 'asc')->get();
	    return view('tasks', compact('tasks'));
	}


	public function newTask(Request $request){
	    $validator = Validator::make($request->all(), [
	        'name' => 'required|max:255',
	    ]);
	    if ($validator->fails()) {
	        return redirect('/')
	            ->withInput()
	            ->withErrors($validator);
	    }

	    $task = new task;
	    $task->name = $request->name;
	    $task->save();

	    return redirect('/');
	}




	public function delete(task $task) {
    	$task->delete();
    	return redirect('/');
	}


	public function startEdit(task $task) {
		$etask = $task;
    	$tasks = task::orderBy('created_at', 'asc')->get();
    	return view('edit',compact('etask','tasks'));	
    }



	public function edit(Request $request,task $task){
		$validator = Validator::make($request->all(), [
	        'editedName' => 'required|max:255',
	    ]);
	    if ($validator->fails()) {
	        return redirect('/')
	            ->withInput()
	            ->withErrors($validator);
	    }

	    $task->name = $request->editedName;
	    $task->save();
	    return redirect('/');

	}


}

