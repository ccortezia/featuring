import React from 'react';
import {Link} from 'react-router';
import FeatureEditForm from './FeatureEditForm';
import {browserHistory} from 'react-router';
import store from 'app/root/store';

import {
  remoteRequestFeatureUpdateAction,
  remoteRequestFeatureListAction}
  from 'app/feature/actions';


export function FeatureEdit({data}) {
  let creationForm;

  function onSubmit(submitedData) {
    const obj = Object.assign({}, submitedData, {id: data.id});
    store.dispatch(remoteRequestFeatureUpdateAction(obj))
      .then((action) => action.data)
      .then(() => store.dispatch(remoteRequestFeatureListAction()))
      .then((result) => result && browserHistory.push(`/features/${data.id}`));
  }

  function onCancel() {
    browserHistory.push(`/features/${data.id}`);
  }

  return (
    <div className="panel panel-default panel-feature-main panel-feature-create">
      <h2>Edit this feature request</h2>
      <FeatureEditForm initialValues={data} onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}

export default FeatureEdit;
