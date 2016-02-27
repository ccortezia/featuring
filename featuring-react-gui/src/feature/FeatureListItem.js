import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {browserHistory} from 'react-router';
import {featureDataType} from 'app/feature/types';
import {PRODUCT_AREA_ID_MAP} from 'app/feature/constants';


export function FeatureListItem({data, active, disabled}) {

  function onSelectItem(ev) {
    ev.preventDefault();
    (data.id !== undefined) && !disabled && browserHistory.push(`/features/${data.id}`)
  }

  const maxTitleLenght = 30;
  let title = data.title;
  title = title.length > maxTitleLenght ? title.slice(0, maxTitleLenght) + '...' : title;

  return (
    <a href="#" className={classNames(["list-group-item", {active}, {disabled}])} onClick={onSelectItem}>
      <h4 className="list-group-item-heading">{title}</h4>
      <p className="list-group-item-text">{PRODUCT_AREA_ID_MAP[data.area]}</p>
    </a>
  );
}


FeatureListItem.propTypes = {
  data: featureDataType,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default FeatureListItem;
