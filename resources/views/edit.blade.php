@extends('layouts.app')

@section('newtask')
	@include('error')
    <div class = "container">
            <div class="panel panel-default">           <!-- new task -->
                <div class="panel-heading">New Task</div>

                <div class="panel-body">
                    Task
                    <form action="{{url('task')}}" method="POST" class="form-horizontal">
                    	{{ csrf_field() }}
                    	<div class="col-sm-12">
		                    <div class="form-group">
		                        <input type="text" name="name" id="task-name" class="form-control">
		                    </div>
	                    </div>
	                    <button type="submit" class="btn btn-default btn-md">  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Task  </button> 
	                </form>
                </div>
            </div>
    </div>
@endsection


@section('content')
	@if (count($tasks) > 0)
		<div class = "container">
	            <div class="panel panel-default">           
	                <div class="panel-heading">Current Tasks</div>
	                <div class="panel-body">
	                    <table class="table table-striped">
	                        <thead>
		                        <th>Task</th>
		                        <th>&nbsp;</th>
	                    	</thead>

	                        <tbody>
		                        @foreach ($tasks as $task)
		                            <tr>
		                                <!-- Task Name -->
		                                <td class="table-text">
		                                    <div>{{ $task->name }}</div>
		                                </td>

		                                <td>
				                                <form action="{{ url('task/'.$task->id) }}" method="POST">
											        {{ csrf_field() }}
											        {{ method_field('DELETE') }}
					                                <button type="submit" class="btn btn-danger btn-md col-xs-2">
			                                			<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
			                                		</button> 
			                                	</form>



			                                	<form action="{{ url('task/'.$task->id.'/edit') }}" method="GET">				<!--edit button-->
				                                	<button type="submit" class="btn btn-primary col-xs-2">
				                                		<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>Edit
				                                	</button>
				                                </form>
			                                </div>

		                                </td>
		                            </tr>
		                        @endforeach
	                    	</tbody>

	                    </table>


	                </div>
	            </div>
	    </div>
    @endif
@endsection




@section('edit')
    <div class = "container">
            <div class="panel panel-default">           <!-- new task -->
                <div class="panel-heading">Edit Task</div>

                <div class="panel-body">
                    Task : 
                    <form action=" {{url('task/'.$etask->id.'/edited')}} " method="POST" class="form-horizontal">
                    	{{ csrf_field() }}
                    	<div class="col-sm-12">
		                    <div class="form-group">
		                        <input type="text" name="editedName" id="task-name" class="form-control" value="{{ $etask->name }}">
		                    </div>
	                    </div>
	                    <button type="submit" class="btn btn-default btn-md">  <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit Task  </button> 
	                </form>
                </div>
            </div>
    </div>
@endsection
