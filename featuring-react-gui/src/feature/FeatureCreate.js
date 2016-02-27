import React from 'react';
import {Link} from 'react-router';


export function FeatureCreate() {
  return (
    <div className="panel panel-default panel-feature-create">
      <h2>Create a new feature request</h2>
      <Link to="/features" className="btn btn-default">CANCEL</Link>
    </div>
  );
}

export default FeatureCreate;
