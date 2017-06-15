import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// i'll divide it to piece once i have something to do with this again

class TheDivision extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskData: [] ,
            NewTaskInputTxt : '',
            EditId:-1
        };
        this.handleNewTaskInput = this.handleNewTaskInput.bind(this);
        this.handleNewTaskSubmit = this.handleNewTaskSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleStartEdit = this.handleStartEdit.bind(this);
        this.handleOnEdit = this.handleOnEdit.bind(this);
    }


    componentDidMount(){                        
         this.refreshData();
    }

    refreshData(){
        var self = this;                                            // self = this because within new function it's think this mean new function not TheDivision
        axios.get('/getData').then(function(response){
                                        self.setState({
                                            taskData: response.data.tasks
                                        });
                                    });
    }
    handleNewTaskInput(e){
        this.setState({
            NewTaskInputTxt : e
        });
    }
    handleNewTaskSubmit(e){
        var self = this;
        axios.post('/task', {
            name: this.state.NewTaskInputTxt
            }).then(function(){
                self.refreshData();
                }
        );
        this.setState({NewTaskInputTxt:''}); 
    }
    handleDelete(e){
        var self = this;
        axios.delete('/task/'+e).then(function(){
                                        self.refreshData();
                                    });
    }

    handleStartEdit(e){
        this.setState({
            EditId : e
        });
    }

    handleOnEdit(e){
        var self = this;
        axios.post('/task/'+this.state.EditId+'/edited',{
            editedName: e
        }).then(function(){
                self.refreshData();
                }
        );
        this.setState({
            EditId : -1
        });
    }



    render(){
    return(
            <div>
            <Navbar />
            <NewTask 
                NewTaskInputTxt={this.state.NewTaskInputTxt}
                onChangeNewTaskInput={this.handleNewTaskInput}
                onSubmitNewTask={this.handleNewTaskSubmit}
            />
            { this.state.taskData.length !== 0 && <CurrentTask 
                taskData={this.state.taskData}
                onDelete={this.handleDelete}
                onStartEdit={this.handleStartEdit}
            />}
            {this.state.EditId!== -1 && <EditTask EditId = {this.state.EditId} taskData={this.state.taskData} handleOnEdit={this.handleOnEdit}/>}
            </div>
        );
    }
}


function getIndex(value,arr) {
    for(var i = 0; i < arr.length; i++) {           // one day i'll use lodash instead
        if(arr[i].id === value) {
            return i;
        }
    }
    return -1;
}

function Navbar(){
    return(
        <div className = "container">
                <nav className="navbar navbar-default">    
                    <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <h4>Task List</h4>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-right">
                                        <button type="button" className="btn btn-default btn-md">
                                        <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span> 
                                        </button>  
                                    </div> 
                                </div>
                            </div>
                        
                    </div>   
                </nav>
        </div>
    );
}


class NewTask extends React.Component{
    constructor(props) {
    super(props);
    this.handleNewTaskInput = this.handleNewTaskInput.bind(this);
    this.handleNewTaskSubmit = this.handleNewTaskSubmit.bind(this);
    }

    handleNewTaskInput(e){
        this.props.onChangeNewTaskInput(e.target.value);
    }

    handleNewTaskSubmit(e){
        e.preventDefault();
        this.props.onSubmitNewTask();
    }
    render(){
        return (
            <div className = "container">
                <div className="panel panel-default">           
                    <div className="panel-heading">New Task</div>
                        <div className="panel-body">
                            Task
                            <form  className="form-horizontal" onSubmit = {this.handleNewTaskSubmit} >
                                <div className="col-sm-12 form-group">
                                        <input type="text" value={this.props.NewTaskInputTxt} onChange={this.handleNewTaskInput} className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-default btn-md"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Task </button> 
                            </form>
                        </div>
                    </div>
                </div>
        );
    };
}

class CurrentTask extends React.Component{
    render() {
        var renderTask= [];
        this.props.taskData.map(    (onetask) =>
            renderTask.push(
                                    <tr key={onetask.id}>
                                        <td className="table-text">
                                            <div>{onetask.name}</div>
                                        </td>
                                        <td><div><DeleteButton onDelete = {this.props.onDelete} id={onetask.id} /></div> <div><EditButton onStartEdit={this.props.onStartEdit} id={onetask.id}/></div>  </td>
                                    </tr>
            )
        );


        return (
            <div className = "container">
                <div className="panel panel-default">           
                    <div className="panel-heading">Current Tasks</div>
                    <div className="panel-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTask}
                            </tbody>
                            </table>
                    </div>
                </div>
            </div>
        );
    }

}

class DeleteButton extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(e){
        e.preventDefault();
        this.props.onDelete(this.props.id);
    }
    render(){
        return(
                <form onSubmit = {this.handleDelete} >
                    <button type="submit" className="btn btn-danger btn-md col-xs-2">
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
                    </button> 
                </form>
        );
    };
}
class EditButton extends React.Component{
    constructor(props){
        super(props);
        this.handleStartEdit = this.handleStartEdit.bind(this);
    } 
    handleStartEdit(e){
        e.preventDefault();
        this.props.onStartEdit(this.props.id);
    }
    render(){
        return(
                <form onSubmit = {this.handleStartEdit}>      
                    <button type="submit" className="btn btn-primary col-xs-2">
                        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>Edit
                    </button>
                </form>
        );
    };
}

class EditTask extends React.Component{
    constructor(props){
        super(props);
        this.handleOnEdit = this.handleOnEdit.bind(this);
    } 
    handleOnEdit(e){
        this.props.handleOnEdit(e.target.value);
    }
    render(){
        return(
            <div className = "container">
                <div className="panel panel-default">           
                    <div className="panel-heading">Edit Task</div>
                    <div className="panel-body">
                        Task : {this.props.taskData[getIndex(this.props.EditId,this.props.taskData)].name}          
                        <form className="form-horizontal">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input type="text" onBlur={this.handleOnEdit} className="form-control" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    };
}


ReactDOM.render(
    <TheDivision />,
  document.getElementById('TheDivision')
);