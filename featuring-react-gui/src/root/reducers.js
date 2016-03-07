import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {featureReducer} from 'app/feature';
import {sessionReducer} from 'app/session';
import {errorReducer} from 'app/error';
import {homeReducer} from 'app/home';

import {
  featureEditFormNormalizer,
  featureCreateFormNormalizer
} from 'app/feature';


const reducer = combineReducers({
  routing: routerReducer,
  feature: featureReducer,
  error: errorReducer,
  session: sessionReducer,
  home: homeReducer,
  form: formReducer.normalize({
    featureEditForm: featureEditFormNormalizer,
    featureCreateForm: featureCreateFormNormalizer
  })
});

export default reducer;
