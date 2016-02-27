import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {browserHistory} from 'react-router';
import {featureDataType} from 'app/feature/types';


export function FeatureListItem({data, active, dispatch}) {

  function onSelectItem(ev) {
    ev.preventDefault();
    (data.id !== undefined) && browserHistory.push(`/features/${data.id}`)
  }

  const maxTitleLenght = 30;
  let title = data.title;
  title = title.length > maxTitleLenght ? title.slice(0, maxTitleLenght) + '...' : title;

  return (
    <a href="#" className={classNames(["list-group-item", {active}])} onClick={onSelectItem}>
      <h4 className="list-group-item-heading">{title}</h4>
      <p className="list-group-item-text">{data.area}</p>
    </a>
  );
}


FeatureListItem.propTypes = {
  data: featureDataType,
  active: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(FeatureListItem);
