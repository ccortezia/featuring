import * as CT from 'app/feature/constants';
import FeaturesRemoteAPI from './FeaturesRemoteAPI';
import {extractReasonFromHttpError} from 'app/common/services';

const api = new FeaturesRemoteAPI();


// ------------------------------
// Sync Actions
// ------------------------------

export function selectFeatureFilterClientAction(id) {
  return {type: CT.SELECT_FEATURE_FILTER_CLIENT, clientId: Number(id)};
}

// --

export function requestFeatureCreateAction(data) {
  return {type: CT.REQUEST_FEATURE_CREATE, data};
}

export function receiveFeatureCreateAction(data) {
  return {type: CT.RECEIVE_FEATURE_CREATE, data};
}

export function failureFeatureCreateAction(reason) {
  return {type: CT.FAILURE_FEATURE_CREATE, reason};
}

// --

export function requestFeatureListAction() {
  return {type: CT.REQUEST_FEATURE_LIST};
}

export function receiveFeatureListAction(items) {
  return {type: CT.RECEIVE_FEATURE_LIST, items};
}

export function failureFeatureListAction(reason) {
  return {type: CT.FAILURE_FEATURE_LIST, reason};
}

// --

export function requestFeatureUpdateAction(data) {
  return {type: CT.REQUEST_FEATURE_UPDATE, data};
}

export function receiveFeatureUpdateAction(data) {
  return {type: CT.RECEIVE_FEATURE_UPDATE, data};
}

export function failureFeatureUpdateAction(reason) {
  return {type: CT.FAILURE_FEATURE_UPDATE, reason};
}

// --

export function selectFeatureDeleteAction(id) {
  return {type: CT.SELECT_FEATURE_DELETE, featureId: id};
}

export function requestFeatureDeleteAction(id) {
  return {type: CT.REQUEST_FEATURE_DELETE, featureId: id};
}

export function receiveFeatureDeleteAction() {
  return {type: CT.RECEIVE_FEATURE_DELETE};
}

export function failureFeatureDeleteAction(reason) {
  return {type: CT.FAILURE_FEATURE_DELETE, reason};
}


// ------------------------------
// Async Actions
// ------------------------------

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestFeatureCreateAction(data) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureCreateAction(data));
    })
    .then(() => {
      // Reaches the backend.
      return api.create(data);
    })
    .then((results) => {
      // Announce remote results were retrieved.
      return dispatch(receiveFeatureCreateAction(results));
    })
    .catch((err) => {
      return dispatch(failureFeatureCreateAction(extractReasonFromHttpError(err)))
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestFeatureListAction() {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureListAction());
    })
    .then(() => {
      // Reaches the backend.
      return api.list();
    })
    .then((results) => {
      // Announce remote results were retrieved.
      return dispatch(receiveFeatureListAction(results));
    })
    .catch((err) => {
      return dispatch(failureFeatureListAction(extractReasonFromHttpError(err)))
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestFeatureUpdateAction(data) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureUpdateAction(data));
    })
    .then(() => {
      // Reaches the backend.
      return api.update(data.id, data);
    })
    .then((obj) => {
      // Announce remote success.
      return dispatch(receiveFeatureUpdateAction(obj));
    })
    .catch((err) => {
      return dispatch(failureFeatureUpdateAction(extractReasonFromHttpError(err)))
    });
  };
}

// Creates a dispatcher that signalizes the intention to delete a feature record.
export function remoteRequestFeatureDeleteAction(id) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureDeleteAction(id));
    })
    .then(() => {
      // Reaches the backend.
      return api.del(id);
    })
    .then(() => {
      // Announce remote success.
      return dispatch(receiveFeatureDeleteAction());
    })
    .catch((err) => {
      return dispatch(failureFeatureDeleteAction(extractReasonFromHttpError(err)))
    });
  };
}
