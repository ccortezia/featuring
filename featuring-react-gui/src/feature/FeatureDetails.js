import React from 'react';

export function FeatureDetails({data}) {
  return (
    <div>
      <div>
        <label>Title</label>
        <div>{[data.title]}</div>
      </div>
      <div>
        <label>Description</label>
        <div>{[data.description]}</div>
      </div>
      <div>
        <label>Priority</label>
        <div>{[data.priority]}</div>
      </div>
    </div>
  );
}

export default FeatureDetails;
