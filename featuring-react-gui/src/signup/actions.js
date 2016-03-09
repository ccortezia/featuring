import {extractReasonFromHttpError} from 'app/common/services';
import SignupRemoteAPI from './SignupRemoteAPI';
import * as CT from './constants';
import {errorAction} from 'app/error';

const api = new SignupRemoteAPI();


function extractReasonFromAppError(err) {
  return err.reason;
}

function extractReasonFromError(err) {
  const http = extractReasonFromHttpError(err.err);
  const app = extractReasonFromAppError(err.body);
  return {http, app};
}

// ------------------------------
// Sync Actions
// ------------------------------

export function requestSignupCreateAction({data, origin}) {
  return {type: CT.REQUEST_SIGNUP_CREATE, data, origin};
}

export function receiveSignupCreateAction({token, origin}) {
  return {type: CT.RECEIVE_SIGNUP_CREATE, token, origin};
}

export function failureSignupCreateAction({reason, origin}) {
  return errorAction({failure: CT.FAILURE_SIGNUP_CREATE, reason, origin});
}


// ------------------------------
// Async Actions
// ------------------------------

// Creates a dispatcher that signalizes the intention to create a remote session.
export function requestSignupCreateAsyncAction({username, email, fullname, origin}) {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(requestSignupCreateAction({username, email, fullname, origin})))
      .then(() => api.create({username, email, fullname}))
      .catch((err) => console.error(err) || Promise.reject(err))
      .catch((err) => Promise.reject(extractReasonFromError(err)))
      .catch((reason) => Promise.reject(dispatch(failureSignupCreateAction({reason, origin}))));
  };
}
