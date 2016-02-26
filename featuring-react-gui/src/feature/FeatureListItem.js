import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {selectFeatureListItemAction} from 'app/feature/actions';


export function FeatureListItem({data, active, dispatch}) {

  function onSelectItem(ev) {
    ev.preventDefault();
    dispatch(selectFeatureListItemAction(data.id));
  }

  return (
    <a href="#" className={classNames(["list-group-item", {active}])} onClick={onSelectItem}>
      <h4 className="list-group-item-heading">{[data.title.repeat(5)]}</h4>
      <p className="list-group-item-text">{[data.productArea || 'Policies']}</p>
    </a>
  );
}

export default connect()(FeatureListItem);
