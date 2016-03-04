import React from 'react';
import {Link} from 'react-router';
import FeatureCreateForm from './FeatureCreateForm';
import {browserHistory} from 'react-router';
import store from 'app/root/store';
import {ackFailureNetworkAction} from 'app/error/actions';
import {createErrorAlert} from 'app/common/alert';

import {
  remoteRequestFeatureCreateAction,
  remoteRequestFeatureListAction}
  from 'app/feature/actions';


export function FeatureCreate({err}) {
  let creationForm;

  function onSubmit(data) {
    let nid;
    store.dispatch(remoteRequestFeatureCreateAction(data))
      .then((action) => nid = action.data.id)
      .then(() => store.dispatch(remoteRequestFeatureListAction()))
      .then((result) => result && browserHistory.push(`/features/${nid}`));
  }

  function onCancel() {
    browserHistory.push('/features');
  }

  function acknowledgeError() {
    store.dispatch(ackFailureNetworkAction())
  }

  return (
    <div className="panel panel-default panel-feature-main panel-feature-create">
      {err && !err.ack && createErrorAlert(err, acknowledgeError)}
      <h2>Create one more request</h2>
      <FeatureCreateForm onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}

export default FeatureCreate;
