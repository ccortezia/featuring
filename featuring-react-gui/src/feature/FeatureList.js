import React from 'react';
import {FeatureListItem} from 'app/feature';


export function FeatureList({items}) {
  return (
    <div>
      <ul>
        {items.map((item) => <FeatureListItem key={item.id} data={item} />)}
      </ul>
    </div>
  );
}

export default FeatureList;
