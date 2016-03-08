import * as CT from 'app/error/constants';


export default function errorReducer(state={}, action) {

  switch (action.type) {

    case CT.ERROR:
      return Object.assign({}, state, {
        [action.origin || '/']: {
          type: action.failure,
          reason: action.reason || "unknown",
          ack: false
        }
      });

    case CT.ACK_ERROR:
      if (!state[action.origin])  {
        return state;
      }
      return Object.assign({}, state, {
        [action.origin || '/']: Object.assign({}, state[action.origin] || {}, {ack: true})
      });

    default:
      return state;
  }
}
