import * as CT from 'app/error/constants';


export default function errorReducer(state={reason: "unknown", ack: true}, action) {

  switch (action.type) {

    case CT.FAILURE_NETWORK:
      return {reason: action.reason || "unknown", ack: false};

    case CT.ACK_FAILURE_NETWORK:
      return Object.assign({}, state, {ack: true});

    default:
      return state;
  }
}
