import * as CT from 'app/feature/constants';


export default function featureBoardReducer(state={}, action) {

  switch (action.type) {

    case CT.RECEIVE_FEATURE_LIST:
      return Object.assign({}, state, {items: action.items});

    default:
      return state;
  }
}
