import * as CT from 'app/feature/constants';


export default function featureBoardReducer(state={}, action) {

  switch (action.type) {

    case CT.RECEIVE_FEATURE_LIST:
      return Object.assign({}, state, {items: action.items});

    case CT.SELECT_FEATURE_LIST_ITEM:
      return Object.assign({}, state, {mode: 'show', selectedId: action.featureId});

    default:
      return state;
  }
}
