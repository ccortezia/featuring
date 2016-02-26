import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {featureReducer} from 'app/feature';


const reducer = combineReducers({
  routing: routerReducer,
  feature: featureReducer
});

export default reducer;
