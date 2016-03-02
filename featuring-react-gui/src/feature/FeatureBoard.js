import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {FeatureList, FeatureDetails, FeatureCreateInvitation} from 'app/feature';


export function FeatureBoard({items, err, current}) {
  const paramId = _.get(current, 'props.params.id');
  const numberId = Number(paramId);
  const id = (Number.isInteger(numberId) && numberId) || undefined;
  const data = (id !== undefined && _.find(items, {id})) || _.first(items);
  const CentralComponent = (current && current.type) || FeatureDetails;
  const creating = current && current.props.location.pathname == '/features/new';
  const editing = current && !!current.props.location.pathname.match(/edit/);

  return (
    <div className="board-feature">
      <FeatureList
        items={items || []}
        selectedId={data && data.id}
        creating={creating}
        editing={editing} />

      {/* TODO: add conditional rendering of details and default page here */}
      {(data || creating) ? <CentralComponent data={data} err={err} /> : <FeatureCreateInvitation />}
    </div>
  );
}

export default connect((state) => ({
  items: state.feature.board.items,
  err: state.error
}))(FeatureBoard);
