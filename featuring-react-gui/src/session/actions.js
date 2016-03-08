import {extractReasonFromHttpError} from 'app/common/services';
import SessionRemoteAPI from './SessionRemoteAPI';
import {destroySessionToken} from './services';
import * as CT from './constants';
import {errorAction} from 'app/error';

const api = new SessionRemoteAPI();


// ------------------------------
// Sync Actions
// ------------------------------

export function requestSessionCreateAction({data, origin}) {
  return {type: CT.REQUEST_SESSION_CREATE, data, origin};
}

export function receiveSessionCreateAction({token, origin}) {
  return {type: CT.RECEIVE_SESSION_CREATE, token, origin};
}

export function failureSessionCreateAction({reason, origin}) {
  return errorAction({failure: CT.FAILURE_SESSION_CREATE, reason, origin});
}

// --

export function requestSessionDetailAction({origin}) {
  return {type: CT.REQUEST_SESSION_DETAIL, origin};
}

export function receiveSessionDetailAction({data, origin}) {
  return {type: CT.RECEIVE_SESSION_DETAIL, data, origin};
}

export function failureSessionDetailAction({reason, origin}) {
  return errorAction({failure: CT.FAILURE_SESSION_DETAIL, reason, origin});
}


// ------------------------------
// Async Actions
// ------------------------------

// Creates a dispatcher that signalizes the intention to create a remote session.
export function requestSessionCreateAsyncAction({username, password, origin}) {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(requestSessionCreateAction({username, password, origin})))
      .then((action) => api.create(username, password))
      .then((result) => result.token)
      .catch((err) => console.error(err) || Promise.reject(err))
      .catch((err) => Promise.reject(extractReasonFromHttpError(err)))
      .catch((reason) => Promise.reject(dispatch(failureSessionCreateAction({reason, origin}))));
  };
}


// Creates a dispatcher that signalizes the intention to create a remote session.
export function requestSessionDetailAsyncAction({origin} = {origin: null}) {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(requestSessionDetailAction({origin})))
      .then((action) => api.get())
      .then((data) => dispatch(receiveSessionDetailAction({data, origin})))
      .catch((err) => console.error(err) || Promise.reject(err))
      .catch((err) => Promise.reject(extractReasonFromHttpError(err)))
      .catch((reason) => Promise.reject(dispatch(failureSessionDetailAction({reason, origin}))));
  };
}


// Creates a dispatcher that signalizes the intention to logout the current user.
export function requestSessionDeleteAsyncAction() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      destroySessionToken();
      resolve();
    });
  }
}
