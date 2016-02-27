import React from 'react';
import {Link} from 'react-router';
import {FeatureListItem} from 'app/feature';
import {CLIENT_ID_MAP} from 'app/feature/constants';


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
        <select disabled={creating}>
          {
            Object.keys(CLIENT_ID_MAP).map((k) => {
              return <option key={k} value={k}>{CLIENT_ID_MAP[k]}</option>;
            })
          }
        </select>
      </div>

      <div className="list-group list-feature">
        {(items || []).map(mkListItem)}
      </div>
    </div>
  );
}

export default FeatureList;
