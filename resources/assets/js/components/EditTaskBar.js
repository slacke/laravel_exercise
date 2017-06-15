import React from "react"

export default class EditTask extends React.Component{
    constructor(props){
        super(props);
        this.Edited = this.Edited.bind(this);
    } 
    Edited(e){
        this.props.Edited(e);
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
                                    <input type="text" onBlur={this.Edited} className="form-control" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    };
}


function getIndex(value,arr) {
    for(var i = 0; i < arr.length; i++) {           // one day i'll use lodash instead
        if(arr[i].id === value) {
            return i;
        }
    }
    return -1;
}