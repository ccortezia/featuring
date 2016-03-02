import React from 'react';

export function createErrorAlert(err, onDismiss) {
  return (
    <div className="alert alert-danger alert-banner">
      Sorry, but your last performed action failed ({err.reason})
      <i onClick={onDismiss} className="btn-error-ack fa fa-times"/>
    </div>);
}
