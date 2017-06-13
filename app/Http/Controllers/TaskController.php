<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Validator;
use App\Task;

class TaskController extends Controller
{
	public function index(){
	    $tasks = Task::orderBy('created_at', 'asc')->get();
	    return view('tasks', compact('tasks'));
	    
	}

	public function getData(){
		$tasks = Task::orderBy('created_at', 'asc')->get();
		return response()->json([
	    	'tasks' => $tasks
    	]);
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

	    $task = new Task;
	    $task->name = $request->name;
	    $task->save();
	}




	public function delete(Task $task) {
    	$task->delete();
	}


	public function startEdit(Task $task) {
		$etask = $task;
    	$tasks = Task::orderBy('created_at', 'asc')->get();
    	return view('edit',compact('etask','tasks'));	
    }



	public function edit(Request $request,Task $task){
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

	}


}

