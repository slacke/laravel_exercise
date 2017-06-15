import React from "react"
export default class CurrentTask extends React.Component{

    render() {
        var renderTask= [];
        this.props.taskData.map(    (onetask) =>
            renderTask.push(
                                    <tr key={onetask.id}>
                                        <td className="table-text">
                                            <div>{onetask.name}</div>
                                        </td>
                                        <td><div><DeleteButton DelSubmit={this.props.onDelete} id={onetask.id} /></div> <div><EditButton onStartEdit={this.props.onStartEdit} id={onetask.id}/></div>  </td>
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
        this.DeleteSubmit = this.DeleteSubmit.bind(this);
    }
    DeleteSubmit(e){
        e.preventDefault();
        this.props.DelSubmit(this.props.id)
    }
    render(){
        return(
                <form onSubmit = {this.DeleteSubmit} >
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
        this.onStartEdit = this.onStartEdit.bind(this);
    } 
    onStartEdit(e){
        e.preventDefault();
        this.props.onStartEdit(this.props.id);
    }
    render(){
        return(
                <form onSubmit = {this.onStartEdit}>      
                    <button type="submit" className="btn btn-primary col-xs-2">
                        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>Edit
                    </button>
                </form>
        );
    };
}