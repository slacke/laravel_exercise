import update from 'react-addons-update';

export default function taskReducer(state={ task: [],editId: -1,lastId:0 },action){
    switch(action.type){
        case "TASK_ADD" : {
            state = update(state,
                {
                    task: {$push: [{id: state.lastId+1 , name: action.payload}]} , 
                    lastId:{$set:state.lastId+1}   
                })
            return state;                                                                       
        }


        case "TASK_GET_FULFILLED" : {
            const lastIdtemp = action.payload.tasks[action.payload.tasks.length-1].id
            state = update(state,{
                        task: {$set: action.payload.tasks},
                        lastId: {$set: lastIdtemp}
                    }
                )
            return state;
        }
        case "TASK_DELETE" : {
            const index = getIndex(action.payload,state.task)
            return update(state, {
                task: {$splice: [[index, 1]]}
            });
        }
        case "TASK_STARTEDIT" : {
            state = update(state,{ editId: {$set:action.payload}})
            return state;
        }
        case "TASK_EDIT" : {
            const index = getIndex(state.editId,state.task)
            var temp = state.task
            temp[index].name = action.payload
            state = update(state,{
                editId: {$set: -1},
                task: {$set: temp}
            })
            return state;
        }



    }

    return state;
}




function getIndex(value,arr) {
    for(var i = 0; i < arr.length; i++) {           // one day i'll use lodash instead
        if(arr[i].id === value) {
            return i;
        }
    }
    return -1;
}