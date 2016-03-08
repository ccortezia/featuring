import * as CT from 'app/feature/constants';

const defaultState = {
  selectedClientId: 1,
  selectedItemDetailId: undefined
};

function updatedItems(items, data) {
  const nitems = items.slice(0);
  const idx = _.findIndex(nitems, {id: data.id});
  if (idx != -1) {
    nitems[idx] = Object.assign({}, data);
  }
  else {
    nitems.push(data);
    nitems.sort((a, b) => (a.clientId > b.clientId && a.priority > b.priority) ? +1 : -1);
  }
  return nitems;
}

export default function featureBoardReducer(state=defaultState, action) {

  switch (action.type) {

    case CT.RECEIVE_FEATURE_CREATE:
      return Object.assign({}, state, {items: updatedItems(state.items, action.data)});

    case CT.RECEIVE_FEATURE_LIST:
      return Object.assign({}, state, {items: action.items});

    case CT.RECEIVE_FEATURE_ITEM:
      return Object.assign({}, state, {items: updatedItems(state.items, action.data)});

    case CT.SELECT_FEATURE_FILTER_CLIENT:
      return Object.assign({}, state, {selectedClientId: action.clientId});

    case CT.SELECT_FEATURE_LIST_ITEM_DETAIL:
      return Object.assign({}, state, {selectedItemDetailId: action.item.id});

    case CT.NAVBACK_FROM_CENTRAL:
      return Object.assign({}, state, {selectedItemDetailId: undefined});

    default:
      return state;
  }
}
