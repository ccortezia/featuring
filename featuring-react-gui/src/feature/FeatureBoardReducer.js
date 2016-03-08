import * as CT from 'app/feature/constants';

const defaultState = {
  selectedClientId: 1,
  selectedItemDetailId: undefined
};

export default function featureBoardReducer(state=defaultState, action) {

  switch (action.type) {

    case CT.RECEIVE_FEATURE_LIST:
      return Object.assign({}, state, {items: action.items});

    case CT.SELECT_FEATURE_FILTER_CLIENT:
      return Object.assign({}, state, {selectedClientId: action.clientId});

    case CT.SELECT_FEATURE_LIST_ITEM_DETAIL:
      return Object.assign({}, state, {selectedItemDetailId: action.item.id});

    case CT.NAVBACK_FROM_STAGE:
      return Object.assign({}, state, {selectedItemDetailId: undefined});

    default:
      return state;
  }
}
