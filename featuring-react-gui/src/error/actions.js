import * as CT from 'app/error/constants';

// ------------------------------
// Sync Actions
// ------------------------------

export function failureNetworkAction(reason) {
  return {type: CT.FAILURE_NETWORK, reason};
}


export function ackFailureNetworkAction() {
  return {type: CT.ACK_FAILURE_NETWORK};
}
