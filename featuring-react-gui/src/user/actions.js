import * as CT from 'app/user/constants';
import UsersRemoteAPI from './UsersRemoteAPI';
import {extractReasonFromHttpError} from 'app/common/services';
import {failureNetworkAction} from 'app/error/actions';

const api = new UsersRemoteAPI();


// ------------------------------
// Sync Actions
// ------------------------------

export function requestUserCreateAction(data) {
  return {type: CT.REQUEST_USER_CREATE, data};
}

export function receiveUserCreateAction(data) {
  return {type: CT.RECEIVE_USER_CREATE, data};
}

export function failureUserCreateAction(reason) {
  return {type: CT.FAILURE_USER_CREATE, reason};
}

// --

export function requestUserListAction() {
  return {type: CT.REQUEST_USER_LIST};
}

export function receiveUserListAction(items) {
  return {type: CT.RECEIVE_USER_LIST, items};
}

export function failureUserListAction(reason) {
  return {type: CT.FAILURE_USER_LIST, reason};
}

// --

export function requestUserUpdateAction(data) {
  return {type: CT.REQUEST_USER_UPDATE, data};
}

export function receiveUserUpdateAction(data) {
  return {type: CT.RECEIVE_USER_UPDATE, data};
}

export function failureUserUpdateAction(reason) {
  return {type: CT.FAILURE_USER_UPDATE, reason};
}

// --

export function selectUserDeleteAction(id) {
  return {type: CT.SELECT_USER_DELETE, featureId: id};
}

export function requestUserDeleteAction(id) {
  return {type: CT.REQUEST_USER_DELETE, featureId: id};
}

export function receiveUserDeleteAction() {
  return {type: CT.RECEIVE_USER_DELETE};
}

export function failureUserDeleteAction(reason) {
  return {type: CT.FAILURE_USER_DELETE, reason};
}


// ------------------------------
// Async Actions
// ------------------------------

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestUserCreateAction(data) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserCreateAction(data));
    })
    .then(() => {
      // Reaches the backend.
      return api.create(data);
    })
    .then((results) => {
      // Announce remote results were retrieved.
      return dispatch(receiveUserCreateAction(results));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction(reason)));
    })
    .catch((action) => {
      return Promise.reject(dispatch(failureNetworkAction(action.reason)));
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestUserListAction() {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserListAction());
    })
    .then(() => {
      // Reaches the backend.
      return api.list();
    })
    .then((results) => {
      // Announce remote results were retrieved.
      return dispatch(receiveUserListAction(results));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction(reason)));
    })
    .catch((action) => {
      return Promise.reject(dispatch(failureNetworkAction(action.reason)));
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestUserUpdateAction(data) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserUpdateAction(data));
    })
    .then(() => {
      // Reaches the backend.
      return api.update(data.username, data);
    })
    .then((obj) => {
      // Announce remote success.
      return dispatch(receiveUserUpdateAction(obj));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction(reason)));
    })
    .catch((action) => {
      return Promise.reject(dispatch(failureNetworkAction(action.reason)));
    });;
  };
}

// Creates a dispatcher that signalizes the intention to delete a user record.
export function remoteRequestUserDeleteAction(id) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserDeleteAction(id));
    })
    .then(() => {
      // Reaches the backend.
      return api.del(id);
    })
    .then(() => {
      // Announce remote success.
      return dispatch(receiveUserDeleteAction());
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction(reason)));
    })
    .catch((action) => {
      return Promise.reject(dispatch(failureNetworkAction(action.reason)));
    });;
  };
}
