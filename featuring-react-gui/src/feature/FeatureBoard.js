import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {FeatureFilteredList, FeatureDetails} from 'app/feature';


export function FeatureBoard({items, current}) {
  const paramId = _.get(current, 'props.params.id');
  const numberId = Number(paramId);
  const id = (Number.isInteger(numberId) && numberId) || undefined;
  const data = (id !== undefined && _.find(items, {id})) || _.first(items);
  const CentralComponent = (current && current.type) || FeatureDetails;
  const creating = current && current.props.location.pathname == '/features/new';

  return (
    <div className="board-feature">
      <FeatureFilteredList items={items || []} selectedId={data && data.id} creating={creating} />
      {/* TODO: add conditional rendering of details and default page here */}
      {data && <CentralComponent data={data} />}
    </div>
  );
}

export default connect((state) => ({
  items: state.feature.board.items,
}))(FeatureBoard);
