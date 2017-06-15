import { applyMiddleware, createStore} from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./Reducers/taskReducer"

const middleware = applyMiddleware(promise(),thunk,logger)

const store = createStore(reducer, middleware)

store.subscribe( () => 
    {
        console.log("store changed",store.getState())
    } 
)

export default store;