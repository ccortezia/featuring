import * as CT from 'app/session/constants';


export function sessionReducer(state={username: undefined}, action) {

  switch (action.type) {

    case CT.RECEIVE_SESSION_DETAIL:
      return {username: action.username};

    case CT.FAILURE_SESSION_CREATE:
      return {username: undefined, failure: true, reason: action.reason};

    default:
      return state;
  }
}
