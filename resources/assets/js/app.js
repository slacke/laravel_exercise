import React from 'react';
import ReactDOM from 'react-dom';


import {applyMiddleware,createStore,combineReducers} from "redux"
import logger from "redux-logger"
const userReducer = function(state={},action){
    switch(action.type){
        case "CHANGE_NAME" : {
            state = Object.assign({},state, {name: action.payload})
            break
        }
        case "CHANGE_AGE" : {
            state = Object.assign({},state, {age: action.payload})
            break
        }
    }

    return state;
}

const tweetsReducer = function(state=[],action){

    return state
}

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer
});


const middleware = applyMiddleware(logger);
const store = createStore(reducers,middleware);

store.subscribe( () => 
    {
        console.log("store changed",store.getState())
    } 
)

store.dispatch({type:"CHANGE_NAME", payload: 'HI'});
store.dispatch({type:"CHANGE_AGE", payload: 3});

ReactDOM.render(<h1>aa</h1>, document.getElementById('FluxApp'));