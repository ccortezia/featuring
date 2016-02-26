import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {FeatureList, FeatureDetails} from 'app/feature';


export function FeatureBoard({items, selectedId}) {
  return (
    <div className="board-feature">
      <FeatureList items={items} selectedId={selectedId} />
      <FeatureDetails data={_.find(items, {id: selectedId})}/>
    </div>
  );
}


export default connect((state) => ({
  items: state.feature.board.items,
  selectedId: state.feature.board.selectedId
}))(FeatureBoard);
