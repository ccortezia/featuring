import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {featureReducer} from 'app/feature';


const reducer = combineReducers({
  routing: routerReducer,
  feature: featureReducer,
  form: formReducer
});

export default reducer;
