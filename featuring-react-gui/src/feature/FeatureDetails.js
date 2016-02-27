import _ from 'lodash';
import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import store from 'app/root/store';
import {featureDataType} from 'app/feature/types';
import {remoteRequestFeatureDeleteAction, remoteRequestFeatureListAction} from 'app/feature/actions';
import {PRODUCT_AREA_ID_MAP, CLIENT_ID_MAP} from 'app/feature/constants';


export function FeatureDetails({data}) {

  function tryToRedirectToSomeFeature(action) {
    // TODO: move this logic into a route redirect function.
    const features = action.items;
    const id = (_.first(features) || {}).id;
    const url = id !== undefined ? `/features/${id}` : `/features`;
    browserHistory.push(url);
  }

  function onDeleteClicked(ev) {
    store
      .dispatch(remoteRequestFeatureDeleteAction(data.id))
      .then(() => store.dispatch(remoteRequestFeatureListAction()))
      .then(tryToRedirectToSomeFeature);
  }

  return (
    <div className="panel panel-default panel-feature-details">

      <div>
        <h2>
          <div>{[data.title]}</div>
          <small>{[CLIENT_ID_MAP[data.clientId] || '<UNKNOWN>']}</small>
        </h2>
        <div className="feature-detail-field-description">{data.description || 'No description provided'}</div>
        <hr />
      </div>

      <div>
        <div className="feature-detail-field">
          <label>Target Date</label>
          <div>{data.deadline}</div>
        </div>
        <div className="feature-detail-field">
          <label>Product Area</label>
          <div>{PRODUCT_AREA_ID_MAP[data.area]}</div>
        </div>
        <div className="feature-detail-field">
          <label>Ticket</label>
          <div>
            <a href={data.ticketUrl}>{data.ticketUrl}</a>
          </div>
        </div>
      </div>

      <div>
        <button onClick={onDeleteClicked} className="btn btn-danger">DELETE</button>
      </div>
    </div>
  );
}

FeatureDetails.propTypes = {
  data: featureDataType
};

export default FeatureDetails;
