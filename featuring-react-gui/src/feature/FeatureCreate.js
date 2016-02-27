import React from 'react';
import {Link} from 'react-router';
import FeatureCreateForm from './FeatureCreateForm';
import {browserHistory} from 'react-router';
import store from 'app/root/store';
import {remoteRequestFeatureCreateAction, remoteRequestFeatureListAction} from 'app/feature/actions';


export function FeatureCreate() {
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

  return (
    <div className="panel panel-default panel-feature-create">
      <h2>Create one more request</h2>
      <FeatureCreateForm onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}

export default FeatureCreate;
