import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {browserHistory} from 'react-router';
import {featureDataType} from 'app/feature/types';
import {PRODUCT_AREA_ID_MAP} from 'app/feature/constants';
import store from 'app/root/store';

import {
  remoteRequestFeatureUpdateAction,
  remoteRequestFeatureListAction}
  from 'app/feature/actions';


export function FeatureListItem({data, active, disabled, top}) {

  function onSelectItem(ev) {
    ev.preventDefault();
    (data.id !== undefined) && !disabled && browserHistory.push(`/features/${data.id}`)
  }

  function onRaisePriorityClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const obj = Object.assign({}, data, {priority: data.priority - 1});
    store.dispatch(remoteRequestFeatureUpdateAction(obj))
      .then(() => store.dispatch(remoteRequestFeatureListAction()));
  }

  const maxTitleLenght = 35;
  let title = data.title;
  title = title.length > maxTitleLenght ? title.slice(0, maxTitleLenght) + '...' : title;

  const priorityRaiseButton = (active && !top) &&
    <button className="btn btn-default btn-inc-priority" onClick={onRaisePriorityClick}>
      <i className="fa fa-level-up"></i>
    </button>;

  return (
    <a href="#" className={classNames(["list-group-item", {active}, {disabled}])} onClick={onSelectItem}>
      <h4 className="list-group-item-heading">{title}</h4>
      <p className="list-group-item-text">{PRODUCT_AREA_ID_MAP[data.area] + ' ' + data.priority}</p>
      {priorityRaiseButton}
    </a>
  );
}


FeatureListItem.propTypes = {
  data: featureDataType,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  top: PropTypes.bool.isRequired
};

export default FeatureListItem;
