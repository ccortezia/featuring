import * as CT from 'app/feature/constants';
import FeaturesRemoteAPI from './FeaturesRemoteAPI';

const api = new FeaturesRemoteAPI();


// ------------------------------
// Sync Actions
// ------------------------------

export function selectFeatureCreateAction() {
  return {type: CT.SELECT_FEATURE_CREATE};
}

export function selectFeatureFilterClientAction(id) {
  return {type: CT.SELECT_FEATURE_FILTER_CLIENT, clientId: id};
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
