import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {featureReducer} from 'app/feature';
import {sessionReducer} from 'app/session';
import {errorReducer} from 'app/error';
import {featureEditFormNormalizer} from 'app/feature/form-normalizers';


const reducer = combineReducers({
  routing: routerReducer,
  feature: featureReducer,
  error: errorReducer,
  session: sessionReducer,
  form: formReducer.normalize({
    featureEditForm: featureEditFormNormalizer
  })
});

export default reducer;
