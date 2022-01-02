import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import JoinBoxReducer from './reducers/JoinBoxReducer';
import ChatRoomReducer from './reducers/ChatRoomReducer';

const rootReducers = combineReducers({
  joinBox: JoinBoxReducer,
  chatRoom: ChatRoomReducer
}) 

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

export default store;