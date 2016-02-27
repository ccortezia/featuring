import React from 'react';
import {Link} from 'react-router';
import {FeatureListItem} from 'app/feature';


export function FeatureList({items, selectedId, creating}) {

  function mkListItem(item) {
    return <FeatureListItem
      key={item.id}
      data={item}
      active={!creating && item.id == selectedId}
      enabled={!creating}
    />;
  }

  return (
    <div className="panel panel-default panel-feature-list">
      <div className="panel-body">
        {
          creating ?
          <button className="btn btn-default" disabled="true">NEW</button> :
          <Link to="/features/new" className="btn btn-primary">NEW</Link>
        }
        <select>
          <option>Client A</option>
          <option>Client B</option>
          <option>Client C</option>
        </select>
      </div>

      <div className="list-group list-feature">
        {(items || []).map(mkListItem)}
      </div>
    </div>
  );
}

export default FeatureList;
