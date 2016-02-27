import React, {PropTypes} from 'react';
import {featureDataType} from 'app/feature/types';


const clientMap = {
  1: 'Client A',
  2: 'Client B',
  3: 'Client C',
}

export function FeatureDetails({data}) {
  return (
    <div className="panel panel-default panel-feature-details">

      <div>
        <h2>
          <div>{[data.title]}</div>
          <small>{[clientMap[data.clientId] || '<UNKNOWN>']}</small>
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
          <div>{data.area}</div>
        </div>
        <div className="feature-detail-field">
          <label>Ticket</label>
          <div>
            <a href={data.ticketUrl}>{data.ticketUrl}</a>
          </div>
        </div>
      </div>

      <div>
        <button className="btn btn-danger">DELETE</button>
      </div>
    </div>
  );
}

FeatureDetails.propTypes = {
  data: featureDataType
};

export default FeatureDetails;
