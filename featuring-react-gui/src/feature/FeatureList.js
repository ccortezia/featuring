import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import store from 'app/root/store';
import {FeatureListItem} from 'app/feature';
import {CLIENT_ID_MAP} from 'app/feature/constants';
import {selectFeatureFilterClientAction} from 'app/feature/actions';


export function FeatureList({items, selectedId, selectedClientId, clientIds, creating, editing}) {

  function mkListItem(item) {
    const maxp = Math.max.apply(null, items.map((item) => item.priority));
    return <FeatureListItem
      key={item.id}
      data={item}
      top={item.priority >= maxp}
      active={!creating && item.id == selectedId}
      disabled={!!creating || !!editing}
    />;
  }

  function onClientSelectChange(ev) {
    store.dispatch(selectFeatureFilterClientAction(ev.target.value));
  }

  const filteredItems = items.filter((item) => item.clientId == selectedClientId);

  const newButton = (creating || editing) ?
      <button className="btn btn-default" disabled="true">NEW</button> :
      <Link to="/features/new" className="btn btn-primary">NEW</Link>;

  const clientSelector = (clientIds && clientIds.length) ?
    <select
      disabled={creating || editing}
      value={selectedClientId}
      onChange={onClientSelectChange}>
      {clientIds.map((k) =><option key={k} value={k}>{CLIENT_ID_MAP[k]}</option>)}
    </select> : undefined;

  return (
    <div className="panel panel-default panel-feature-list">
      <div className="panel-body">
        {newButton}
        {clientSelector}
      </div>
      <div className="list-group list-feature">
        {(filteredItems || []).map(mkListItem)}
      </div>
    </div>
  );
}


export default connect(
  (state) => {
    const selectedClientId = state.feature.board.selectedClientId;
    const items = (state.feature.board.items || []);
    const clientCounts = getClientCountMap(items);
    const clientIds = Object.keys(clientCounts);
    const defaultClientId = Math.min.apply(null, Object.keys(clientCounts));
    const fixedClientId = clientCounts[selectedClientId] ? selectedClientId : defaultClientId;
    return {items, selectedClientId: fixedClientId, clientIds};
  }
)(FeatureList);


function getClientCountMap(items) {
  return _(items)
    .groupBy('clientId')
    .toPairs()
    .map(([id, items]) => ({[id]: items.length}))
    .value()
    .reduce((curr, val) => Object.assign({}, curr, val), {});
}
