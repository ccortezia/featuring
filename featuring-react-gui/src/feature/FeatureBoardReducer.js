import * as CT from 'app/feature/constants';


export default function featureBoardReducer(state={selectedClientId: 2}, action) {

  switch (action.type) {

    case CT.RECEIVE_FEATURE_LIST:
      return Object.assign({}, state, {items: action.items});

    case CT.SELECT_FEATURE_FILTER_CLIENT:
      return Object.assign({}, state, {selectedClientId: action.clientId});

    default:
      return state;
  }
}
