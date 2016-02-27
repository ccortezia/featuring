import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {FeatureList, FeatureDetails} from 'app/feature';


export function FeatureBoard({items, current}) {
  const paramId = Number(_.get(current, 'props.params.id'));
  const id = (Number.isInteger(paramId) && paramId) || undefined;
  const data = (id !== undefined && _.find(items, {id})) || _.first(items);

  return (
    <div className="board-feature">
      <FeatureList items={items || []} selectedId={data && data.id} />
      {/* TODO: add conditional rendering of details and default page here */}
      {data && <FeatureDetails data={data} />}
    </div>
  );
}

export default connect((state) => ({
  items: state.feature.board.items,
}))(FeatureBoard);
