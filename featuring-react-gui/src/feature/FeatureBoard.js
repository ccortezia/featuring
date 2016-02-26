import React from 'react';
import {FeatureList, FeatureDetails} from 'app/feature';


export function FeatureBoard({items}) {
  return (
    <div className="board-feature">
      <FeatureList items={items}/>
      <FeatureDetails data={items[0]}/>
    </div>
  );
}

export default FeatureBoard;
