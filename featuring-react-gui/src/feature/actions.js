import * as CT from 'app/feature/constants';
import FeaturesRemoteAPI from './FeaturesRemoteAPI';
import {extractReasonFromHttpError} from 'app/common/services';
import {errorAction} from 'app/error/actions';

const api = new FeaturesRemoteAPI();


// ------------------------------
// Sync Actions
// ------------------------------

export function selectFeatureFilterClientAction(id) {
  return {type: CT.SELECT_FEATURE_FILTER_CLIENT, clientId: Number(id)};
}

export function selectFeatureListItemDetailAction(item) {
  return {type: CT.SELECT_FEATURE_LIST_ITEM_DETAIL, item};
}

export function navbackFromBoardCentralAction(item) {
  return {type: CT.NAVBACK_FROM_CENTRAL, item};
}


// --

export function requestFeatureCreateAction({data, origin} = {origin: null}) {
  return {type: CT.REQUEST_FEATURE_CREATE, data, origin};
}

export function receiveFeatureCreateAction({data, origin} = {oriign: null}) {
  return {type: CT.RECEIVE_FEATURE_CREATE, data, origin};
}

export function failureFeatureCreateAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_FEATURE_CREATE, reason, origin});
}

// --

export function requestFeatureListAction({origin} = {origin: null}) {
  return {type: CT.REQUEST_FEATURE_LIST, origin};
}

export function receiveFeatureListAction({items, origin} = {items: [], origin: null}) {
  return {type: CT.RECEIVE_FEATURE_LIST, items, origin};
}

export function failureFeatureListAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_FEATURE_LIST, reason, origin});
}

// --

export function requestFeatureItemAction({origin} = {origin: null}) {
  return {type: CT.REQUEST_FEATURE_ITEM, origin};
}

export function receiveFeatureItemAction({data, origin} = {data: [], origin: null}) {
  return {type: CT.RECEIVE_FEATURE_ITEM, data, origin};
}

export function failureFeatureItemAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_FEATURE_ITEM, reason, origin});
}

// --

export function requestFeatureUpdateAction({data, origin} = {origin: null}) {
  return {type: CT.REQUEST_FEATURE_UPDATE, data, origin};
}

export function receiveFeatureUpdateAction({data, origin} = {origin: null}) {
  return {type: CT.RECEIVE_FEATURE_UPDATE, data, origin};
}

export function failureFeatureUpdateAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_FEATURE_UPDATE, reason, origin});
}

// --

export function selectFeatureDeleteAction({id, origin} = {origin: null}) {
  return {type: CT.SELECT_FEATURE_DELETE, featureId: id, origin};
}

export function requestFeatureDeleteAction({id, origin} = {origin: null}) {
  return {type: CT.REQUEST_FEATURE_DELETE, featureId: id, origin};
}

export function receiveFeatureDeleteAction({id, origin} = {origin: null}) {
  return {type: CT.RECEIVE_FEATURE_DELETE, featureId: id, origin};
}

export function failureFeatureDeleteAction({reason, origin} = {reason: null, origin: null}) {
  return errorAction({failure: CT.FAILURE_FEATURE_DELETE, reason, origin});
}


// ------------------------------
// Async Actions
// ------------------------------

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestFeatureCreateAction({data, origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureCreateAction({data, origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.create(data);
    })
    .then((data) => {
      // Announce remote results were retrieved.
      return dispatch(receiveFeatureCreateAction({data, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureFeatureListAction({reason, origin})));
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestFeatureListAction({origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureListAction({origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.list();
    })
    .then((items) => {
      // Announce remote results were retrieved.
      return dispatch(receiveFeatureListAction({items, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureFeatureListAction({reason, origin})));
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestFeatureItemAction({id, origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureItemAction({id, origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.get(id);
    })
    .then((data) => {
      // Announce remote results were retrieved.
      return dispatch(receiveFeatureItemAction({data, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureFeatureItemAction({reason, origin})));
    });
  };
}

// Creates a dispatcher that signalizes the intention to retrieve the features list.
export function remoteRequestFeatureUpdateAction({data, origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureUpdateAction({data, origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.update(data.id, data);
    })
    .then((data) => {
      // Announce remote success.
      return dispatch(receiveFeatureUpdateAction({data, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureFeatureListAction({reason, origin})));
    });
  };
}

// Creates a dispatcher that signalizes the intention to delete a feature record.
export function remoteRequestFeatureDeleteAction({id, origin} = {origin: null}) {
  return dispatch => {

    return Promise.resolve().then(() => {
      // Announce remote request is in progress.
      return dispatch(requestFeatureDeleteAction({id, origin}));
    })
    .then(() => {
      // Reaches the backend.
      return api.del(id);
    })
    .then(() => {
      // Announce remote success.
      return dispatch(receiveFeatureDeleteAction({id, origin}));
    })
    .catch((err) => {
      return Promise.reject(extractReasonFromHttpError(err));
    })
    .catch((reason) => {
      return Promise.reject(dispatch(failureFeatureListAction({reason, origin})));
    });
  };
}
