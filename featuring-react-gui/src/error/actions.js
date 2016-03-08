import * as CT from 'app/error/constants';

// ------------------------------
// Sync Actions
// ------------------------------

export function errorAction({failure, reason, origin} = {reason: null, origin: null}) {
  return {type: CT.ERROR, failure, reason, origin};
}

export function ackErrorAction({origin} = {origin: null}) {
  return {type: CT.ACK_ERROR, origin};
}
