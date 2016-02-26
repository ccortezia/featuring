import * as CT from 'app/feature/constants';


export function selectFeatureCreateAction() {
  return {type: CT.SELECT_FEATURE_CREATE};
}

export function selectFeatureDeleteAction(id) {
  return {type: CT.SELECT_FEATURE_DELETE, featureId: id};
}

export function selectFeatureListItemAction(id) {
  return {type: CT.SELECT_FEATURE_LIST_ITEM, featureId: id};
}

export function receiveFeatureListAction(items) {
  return {type: CT.RECEIVE_FEATURE_LIST, items};
}

export function selectFeatureFilterClientAction(id) {
  return {type: CT.SELECT_FEATURE_FILTER_CLIENT, clientId: id};
}
