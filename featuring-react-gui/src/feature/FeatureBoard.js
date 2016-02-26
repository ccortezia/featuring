import React from 'react';
import {FeatureList, FeatureDetails} from 'app/feature';


export function FeatureBoard({items}) {
  return (
    <div>
      <FeatureList items={items}/>
      <FeatureDetails data={items[0]}/>
    </div>
  );
}

export default FeatureBoard;
