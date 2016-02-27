import React from 'react';
import {Link} from 'react-router';
import FeatureCreateForm from './FeatureCreateForm';
import {browserHistory} from 'react-router';


export function FeatureCreate() {
  let creationForm;

  function onSubmit(data) {
    console.log(data);
  }

  function onCancel() {
    browserHistory.push('/features');
  }

  return (
    <div className="panel panel-default panel-feature-create">
      <h2>Create a new feature request</h2>
      <FeatureCreateForm onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}

export default FeatureCreate;
