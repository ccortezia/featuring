import _ from 'lodash';
import store from 'app/root/store';

import {
  selectFeatureListItemAction,
  remoteRequestFeatureListAction,
  selectFeatureFilterClientAction}
  from 'app/feature/actions';



export function fixClientIdFilterOnEnterHook(nextState, replace, callback) {
  const state = store.getState();
  const pickFeature = (items) => items.find((item) => item.id == nextState.params.id);
  const determineClient = (obj) => (obj && obj.clientId) || 1;
  const dispatchClientFilter = (clientId) => store.dispatch(selectFeatureFilterClientAction(clientId));

  // This flow is async, and is executed upon full refresh.
  if (!state.feature.board.items) {
    return store.dispatch(remoteRequestFeatureListAction())
      .then((action) => action.items)
      .then(pickFeature)
      .then(determineClient)
      .then(dispatchClientFilter)
      .then(() => callback());
  }

  // This flow is sync, executed upon internal link navigation.
  const feature = pickFeature(state.feature.board.items);
  const clientId = determineClient(feature);
  dispatchClientFilter(clientId);
  return callback();
}


export function tryFirstValidFeatureOnEnterHook(nextState, replace, callback) {
  const state = store.getState();
  const clientFilter = (item) => item.clientId == state.feature.board.selectedClientId;
  const pickBestFeature = (items) => _.first(items.filter(clientFilter));

  function replaceBasedOnFeature(obj) {
    return replace({
      pathname: `/features/${obj.id}`,
      state: {nextPathname: nextState.location.pathname}
    });
  }

  // This flow is async, and is executed upon full refresh.
  if (!state.feature.board.items) {
    return store.dispatch(remoteRequestFeatureListAction())
      .then((action) => action.items)
      .then(pickBestFeature)
      .then(replaceBasedOnFeature)
      .then(() => callback());
  }

  // This flow is sync, executed upon internal link navigation.
  const chosenFeature = pickBestFeature(state.feature.board.items);
  replaceBasedOnFeature(chosenFeature);
  return callback();
}
