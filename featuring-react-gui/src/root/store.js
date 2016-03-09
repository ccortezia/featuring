/*globals process*/
import {createStore, applyMiddleware} from 'redux';
import {default as loggerMiddleware} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'app/root/reducers';
import {authRedirectMiddleware} from 'app/session/middlewares';

let middlewares = [
  thunkMiddleware,
  authRedirectMiddleware('/login')
];

if (process.env.NODE_ENV == 'development') {
  middlewares.push(loggerMiddleware());
}


const store = createStore(
  rootReducer,
  applyMiddleware.apply(null, middlewares)
);

export default store;
