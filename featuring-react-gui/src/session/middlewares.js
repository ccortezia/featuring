import {browserHistory} from 'react-router';
import {resolveSessionAsyncAction} from './actions';


export const authRedirectMiddleware = to => store => next => action => {
  if (action.reason == 'unauthorized') {
    const previousRoute = store.getState().routing.locationBeforeTransitions;
    if (previousRoute && previousRoute.pathname != to) {
      return browserHistory.push(to);
    }
  }
  return next(action);
}
