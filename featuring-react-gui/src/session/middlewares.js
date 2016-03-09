import {browserHistory} from 'react-router';
import * as CT from './constants';


export const authRedirectMiddleware = to => store => next => action => {

  if (action.failure == CT.FAILURE_SESSION_CREATE) {
    return next(action);
  }

  if (action.reason == 'unauthorized') {
    const previousRoute = store.getState().routing.locationBeforeTransitions;
    if (previousRoute && previousRoute.pathname != to) {
      return browserHistory.push(to);
    }
  }
  return next(action);
};
