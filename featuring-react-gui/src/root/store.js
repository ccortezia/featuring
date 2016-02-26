import {combineReducers, createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from 'app/root/reducers';


const store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger()
  )
);

export default store;
