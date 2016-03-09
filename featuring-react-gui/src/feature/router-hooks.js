import _ from 'lodash';
import store from 'app/root/store';

import {
  remoteRequestFeatureListAction,
  selectFeatureFilterClientAction}
  from 'app/feature/actions';



export function onEnterFeatureItem(nextState, replace, callback) {
  const state = store.getState();
  const pickFeature = (items) => items.find((item) => item.id == nextState.params.id);
  const determineClient = (obj) => obj && obj.clientId;
  const dispatchClientFilter = (clientId) => clientId && store.dispatch(selectFeatureFilterClientAction(clientId));

  function redirectToFallback() {
    return replace({
      pathname: `/features`,
      state: {nextPathname: nextState.location.pathname}
    });
  }

  // This flow is async, and is executed upon full refresh.
  if (!state.feature.board.items) {
    return store.dispatch(remoteRequestFeatureListAction())
      .then((action) => action.items)
      .then(pickFeature)
      .then((obj) => obj || redirectToFallback())
      .then(determineClient)
      .then(dispatchClientFilter)
      .catch(errorRedirector(nextState, replace))
      .then(() => callback());
  }

  // This flow is sync, executed upon internal link navigation.
  const feature = pickFeature(state.feature.board.items);
  const clientId = determineClient(feature);
  !feature && redirectToFallback();
  feature && clientId && dispatchClientFilter(clientId);
  return callback();
}


export function onEnterFeatureList(nextState, replace, callback) {
  const state = store.getState();
  const clientFilter = (item) => item.clientId == state.feature.board.selectedClientId;
  const pickBestFeature = (items) => _.first(items.filter(clientFilter)) || _.first(items);

  function replaceBasedOnFeature(obj) {
    if (!obj) return;
    return replace({
      pathname: `/features/${obj.id}`,
      state: {nextPathname: nextState.location.pathname}
    });
  }

  // Re-fetch data upon navigation
  return store.dispatch(remoteRequestFeatureListAction())
    .then((action) => action.items)
    .then(pickBestFeature)
    .then(replaceBasedOnFeature)
    .catch(errorRedirector(nextState, replace))
    .then(() => callback());
}



export function onEnterFeatureCreation(nextState, replace, callback) {
  const state = store.getState();

  // This flow is async, and is executed upon full refresh.
  if (!state.feature.board.items) {
    return store.dispatch(remoteRequestFeatureListAction())
      .catch(errorRedirector(nextState, replace))
      .then(() => callback());
  }

  // This flow is sync, executed upon internal link navigation.
  return callback();
}


function errorRedirector(nextState, replace) {
  return function redirector() {
    return replace({
      pathname: `/error`,
      state: {nextPathname: nextState.location.pathname}
    });
  };
}
