export function AddTask(name){
    return function(dispatch){
                axios.post('/task',{name: name}).then(()=> {
                    dispatch({type: 'TASK_ADD',payload: name})
                })
            }
}
export function GetTask(){
    return function(dispatch){
                axios.get('/getData').then((response)=> {
                    dispatch({type: "TASK_GET_FULFILLED",payload: response.data})
                })
            }
}
export function DeleteTask(id){
    return function(dispatch){
                axios.delete('/task/'+id).then(()=> {
                    dispatch({type: 'TASK_DELETE',payload: id})
                })
            }
}
export function StartEditTask(id){
    return{
        type: 'TASK_STARTEDIT',
        payload: id,
    }
}
export function EditTask(editedName,editId){
    return function(dispatch){
        axios.post('/task/'+editId+'/edited',{editedName: editedName}).then(()=> {
                dispatch({type: 'TASK_EDIT',payload: editedName})
            })
        
    }
}
