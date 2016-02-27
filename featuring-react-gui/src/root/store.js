import {combineReducers, createStore, applyMiddleware} from 'redux';
import {default as loggerMiddleware} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'app/root/reducers';


const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware()
  )
);

export default store;
