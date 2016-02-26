import React from 'react';

export function FeatureListItem({data}) {
  return (
    <a href="#" className="list-group-item">
      <h4 className="list-group-item-heading">{[data.title.repeat(5)]}</h4>
      <p className="list-group-item-text">{[data.productArea || 'Policies']}</p>
    </a>
  );
}

export default FeatureListItem;
