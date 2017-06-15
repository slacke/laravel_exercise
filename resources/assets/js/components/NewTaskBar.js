import React from 'react';
export default class NewTask extends React.Component{
    constructor(props) {
    super(props);
    this.handleNewTaskSubmit = this.handleNewTaskSubmit.bind(this);
    }

    handleNewTaskSubmit(e){
        e.preventDefault();
        this.props.onSubmitNewTask(e);
    }
    render(){
        return (
            <div className = "container">
                <div className="panel panel-default">           
                    <div className="panel-heading">New Task</div>
                        <div className="panel-body">
                            Task
                            <form  className="form-horizontal"  >
                                <div className="col-sm-12 form-group">
                                        <input type="text" onBlur = {this.handleNewTaskSubmit} className="form-control" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );
    };
}