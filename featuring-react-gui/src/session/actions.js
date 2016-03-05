import {extractReasonFromHttpError} from 'app/common/services';
import {persistSessionToken, destroySessionToken} from './services';
import SessionAPI from './SessionAPI';
import * as CT from './constants';

const api = new SessionAPI();


// ------------------------------
// Sync Actions
// ------------------------------

export function requestSessionCreateAction(username, password) {
  return {type: CT.REQUEST_SESSION_CREATE, username, password};
}

export function receiveSessionCreateAction(token) {
  return {type: CT.RECEIVE_SESSION_CREATE, token};
}

export function failureSessionCreateAction(reason) {
  return {type: CT.FAILURE_SESSION_CREATE, reason};
}

// --

export function requestSessionDetailAction() {
  return {type: CT.REQUEST_SESSION_DETAIL};
}

export function receiveSessionDetailAction({username}) {
  return {type: CT.RECEIVE_SESSION_DETAIL, username};
}

export function failureSessionDetailAction(reason) {
  return {type: CT.FAILURE_SESSION_DETAIL, reason};
}



// ------------------------------
// Async Actions
// ------------------------------

// Creates a dispatcher that signalizes the intention to create a remote session.
export function requestSessionCreateAsyncAction(username, password) {
  return dispatch => {

    return Promise.resolve()
      .then(() => destroySessionToken())
      .then(() => dispatch(requestSessionCreateAction(username, password)))
      .then((action) => api.create(username, password))
      .then((result) => result.token)
      .then((token) => persistSessionToken(token))
      .catch((err) => console.error(err) || Promise.reject(err))
      .catch((err) => Promise.reject(extractReasonFromHttpError(err)))
      .catch((reason) => Promise.reject(dispatch(failureSessionCreateAction(reason))));
  };
}


// Creates a dispatcher that signalizes the intention to create a remote session.
export function requestSessionDetailAsyncAction() {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(requestSessionDetailAction()))
      .then((action) => api.get())
      .then((session) => dispatch(receiveSessionDetailAction(session)))
      .catch((err) => console.error(err) || Promise.reject(err))
      .catch((err) => Promise.reject(extractReasonFromHttpError(err)))
      .catch((reason) => Promise.reject(dispatch(failureSessionDetailAction(reason))));
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
