import * as CT from 'app/session/constants';


export function sessionReducer(state={username: undefined}, action) {

  switch (action.type) {

    case CT.RECEIVE_SESSION_DETAIL:
      return {username: action.username, fullname: action.fullname};

    case CT.FAILURE_SESSION_CREATE:
      return {failure: true, reason: action.reason};

    default:
      return state;
  }
}
