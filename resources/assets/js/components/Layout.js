import React from "react"
import { connect } from "react-redux"

import { AddTask,GetTask,DeleteTask,StartEditTask, EditTask } from "../actions/tasksActions"

// dumb components
import NavBar from "./NavBar"
import NewTaskBar from "./NewTaskBar"
import CurrentTaskBar from "./CurrentTaskBar"
import EditTaskBar from "./EditTaskBar"


// smart component boys
function mapStateToProps(state) {
  return { task: state.task,
           editId : state.editId,
           lastId : state.lastId,
   };
}


class Layout extends React.Component{
    constructor(props) {
    super(props);
    this.AddTaskSubmit = this.AddTaskSubmit.bind(this)
    this.onStartEdit = this.onStartEdit.bind(this)
    this.Edited = this.Edited.bind(this)
    this.onDelete = this.onDelete.bind(this)
    }

    componentWillMount(){
        this.props.dispatch(GetTask())
    }

    AddTaskSubmit(e){
        this.props.dispatch( AddTask(e.target.value) )
        e.target.value = ''
    }

    onStartEdit(e){
        this.props.dispatch( StartEditTask(e) )
    }

    Edited(e){
        this.props.dispatch( EditTask(e.target.value,this.props.editId) )
        e.target.value = ''
    }

    onDelete(e){
        this.props.dispatch(DeleteTask(e))
    }
    render(){
        return (
            <div>
                <NavBar />
                <NewTaskBar onSubmitNewTask = {this.AddTaskSubmit} />
                { this.props.task.length !== 0 && 
                <CurrentTaskBar 
                    taskData={this.props.task}
                    onDelete={this.onDelete}
                    onStartEdit={this.onStartEdit}
                />}
                {this.props.editId !== -1 && 
                <EditTaskBar EditId = {this.props.editId} taskData={this.props.task} Edited={this.Edited}/>}

            </div>
        );
    }

}



export default connect(mapStateToProps)(Layout);