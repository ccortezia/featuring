import React from 'react';

export function FeatureDetails({data}) {

  return (
    <div className="panel panel-default panel-feature-details">

      <div>
        <h2>
          <div>{[data.title]}</div>
          <small>{[data.client || 'Client A']}</small>
        </h2>
        <div className="feature-detail-field-description">{[(data.description || 'DESCRI ').repeat(80)]}</div>
        <hr />
      </div>

      <div>
        <div className="feature-detail-field">
          <label>Target Date</label>
          <div>{[data.deadline || '12/2017']}</div>
        </div>
        <div className="feature-detail-field">
          <label>Product Area</label>
          <div>{[data.productArea || "'Policies', 'Billing', 'Claims', 'Reports'" ]}</div>
        </div>
        <div className="feature-detail-field">
          <label>Ticket</label>
          <div>
            <a href={data.ticketUrl || 'http://local.trac/102938123987123'}>
              {['http://local.trac/102938123987123']}
            </a>
          </div>
        </div>
      </div>

      <div>
        <button className="btn btn-danger">DELETE</button>
      </div>
    </div>
  );
}

export default FeatureDetails;
