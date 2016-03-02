import * as CT from 'app/feature/constants';


export default function errorReducer(state=null, action) {

  switch (action.type) {

    case CT.FAILURE_FEATURE_CREATE:
    case CT.FAILURE_FEATURE_LIST:
    case CT.FAILURE_FEATURE_UPDATE:
    case CT.FAILURE_FEATURE_DELETE:
      return action.reason || "unknown";

    default:
      return state;
  }
}
