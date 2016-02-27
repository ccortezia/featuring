import React from 'react';
import {FeatureListItem} from 'app/feature';


export function FeatureList({items, selectedId}) {
  return (
    <div className="panel panel-default panel-feature-list">
      <div className="panel-body">
        <button className="btn btn-default">NEW</button>
        <select>
          <option>Client A</option>
          <option>Client B</option>
          <option>Client C</option>
        </select>
      </div>
      <div className="list-group list-feature">
        {(items || []).map((item) => <FeatureListItem key={item.id} data={item} active={item.id == selectedId} />)}
      </div>
    </div>
  );
}

export default FeatureList;
