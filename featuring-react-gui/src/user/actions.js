import * as CT from 'app/user/constants';
import UserRemoteAPI from './UserRemoteAPI';
import {extractReasonFromHttpError} from 'app/common/services';
import {errorAction} from 'app/error/actions';

const api = new UserRemoteAPI();


// ------------------------------
// Sync Actions
// ------------------------------

export function requestUserCreateAction({data, origin} = {origin: null}) {
  return {type: CT.REQUEST_USER_CREATE, data, origin};
}

export function receiveUserCreateAction({data, origin} = {origin: null}) {
  return {type: CT.RECEIVE_USER_CREATE, data, origin};
}

export function failureUserCreateAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_USER_CREATE, reason, origin});
}

// --

export function requestUserListAction({origin}) {
  return {type: CT.REQUEST_USER_LIST, origin};
}

export function receiveUserListAction({items, origin} = {items: [], origin: null}) {
  return {type: CT.RECEIVE_USER_LIST, items, origin};
}

export function failureUserListAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_USER_LIST, reason, origin});
}

// --

export function requestUserItemAction({username, origin} = {origin: null}) {
  return {type: CT.REQUEST_USER_ITEM, username, origin};
}

export function receiveUserItemAction({data, origin} = {origin: null}) {
  return {type: CT.RECEIVE_USER_ITEM, data, origin};
}

export function failureUserItemAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_USER_ITEM, reason, origin});
}

// --

export function requestUserUpdateAction({data, origin} = {origin: null}) {
  return {type: CT.REQUEST_USER_UPDATE, data, origin};
}

export function receiveUserUpdateAction({data, origin} = {origin: null}) {
  return {type: CT.RECEIVE_USER_UPDATE, data, origin};
}

export function failureUserUpdateAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_USER_UPDATE, reason, origin});
}

// --

export function selectUserDeleteAction({username, origin} = {origin: null}) {
  return {type: CT.SELECT_USER_DELETE, username: username, origin};
}

export function requestUserDeleteAction({username, origin} = {origin: null}) {
  return {type: CT.REQUEST_USER_DELETE, username: username, origin};
}

export function receiveUserDeleteAction({username, origin} = {origin: null}) {
  return {type: CT.RECEIVE_USER_DELETE, username, origin};
}

export function failureUserDeleteAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_USER_DELETE, reason, origin});
}


// ------------------------------
// Async Actions
// ------------------------------

// Creates a dispatcher that signalizes the intention to retrieve the users list.
export function remoteRequestUserCreateAction({data, origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserCreateAction({data, origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.create(data);
    })
    .then((data) => {
      // Announce remote results were retrieved.
      return dispatch(receiveUserCreateAction({data, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction({reason, origin})));
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the users list.
export function remoteRequestUserListAction({origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserListAction({origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.list();
    })
    .then((items) => {
      // Announce remote results were retrieved.
      return dispatch(receiveUserListAction({items, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction({reason, origin})));
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve an user item.
export function remoteRequestUserItemAction({username, origin} = {origin: null}) {
  return dispatch => {
    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserItemAction({username, origin}));
    })
    .then((action) => {
      // Reaches the backend.
      return api.get(username);
    })
    .then((data) => {
      // Announce remote results were retrieved.
      return dispatch(receiveUserItemAction({data, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction({reason, origin})));
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the users list.
export function remoteRequestUserUpdateAction({data, origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserUpdateAction({data, origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.update(data.username, data);
    })
    .then((data) => {
      // Announce remote success.
      return dispatch(receiveUserUpdateAction({data, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction({reason, origin})));
    });
  };
}

// Creates a dispatcher that signalizes the intention to delete a user record.
export function remoteRequestUserDeleteAction({username, origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestUserDeleteAction({username, origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.del(username);
    })
    .then(() => {
      // Announce remote success.
      return dispatch(receiveUserDeleteAction({username, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureUserListAction({reason, origin})));
    });
  };
}
