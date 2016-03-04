import _ from 'lodash';
import moment from 'moment';
import React, {PropTypes} from 'react';
import Modal from 'react-modal';
import {browserHistory} from 'react-router';
import store from 'app/root/store';
import {featureDataType} from 'app/feature/types';
import {PRODUCT_AREA_ID_MAP, CLIENT_ID_MAP} from 'app/feature/constants';
import {ackFailureNetworkAction} from 'app/error/actions';
import {createErrorAlert} from 'app/common/alert';

import {
  remoteRequestFeatureDeleteAction,
  remoteRequestFeatureListAction}
  from 'app/feature/actions';


export class FeatureDetails extends React.Component {

  constructor({data}) {
    super({data});
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.onEditClicked = this.onEditClicked.bind(this);
    this.handleDelAckModalCloseRequest = this.handleDelAckModalCloseRequest.bind(this);
    this.handleDelAckModalConfirmRequest = this.handleDelAckModalConfirmRequest.bind(this);
    this.acknowledgeError = this.acknowledgeError.bind(this);
    this.state = {pendingDelAck: false};
  }

  onDeleteClicked(ev) {
    this.setState({pendingDelAck: true});
  }

  onEditClicked(ev) {
    browserHistory.push(`/features/${this.props.data.id}/edit`);
  }

  handleDelAckModalCloseRequest() {
    this.setState({pendingDelAck: false});
  }

  handleDelAckModalConfirmRequest() {
    store
      .dispatch(remoteRequestFeatureDeleteAction(this.props.data.id))
      .then(() => store.dispatch(remoteRequestFeatureListAction()))
      .then(() => this.setState({pendingDelAck: false}))
      .then(() => browserHistory.push('/features'))
      .catch(() => this.setState({pendingDelAck: false}));
  }

  acknowledgeError() {
    store.dispatch(ackFailureNetworkAction())
  }

  render() {

    const modalStyles = {
      overlay: {
        zIndex         : '2',
      },
      content : {
        top            : '50%',
        left           : '50%',
        right          : 'auto',
        bottom         : 'auto',
        marginRight    : '-50%',
        transform      : 'translate(-50%, -50%)',
        minHeight      : '180px',
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'space-between',
      }
    };

    return (
      <div className="panel panel-default panel-feature-main panel-feature-details">
        {this.props.err && !this.props.err.ack && createErrorAlert(this.props.err, this.acknowledgeError)}

        <div>
          <h2>
            <div>{[this.props.data.title]}</div>
            <small>{[CLIENT_ID_MAP[this.props.data.clientId] || '<UNKNOWN>']}</small>
          </h2>
          <div className="feature-detail-field-description">
            {this.props.data.description || 'No description provided'}
          </div>
          <hr />
        </div>

        <div>
          <div className="feature-detail-field">
            <label>Target Date</label>
            <div>{moment(this.props.data.deadline).format('MM/DD/YYYY')}</div>
          </div>
          <div className="feature-detail-field">
            <label>Product Area</label>
            <div>{PRODUCT_AREA_ID_MAP[this.props.data.area]}</div>
          </div>
          <div className="feature-detail-field">
            <label>Ticket</label>
            <div>
              <a href={this.props.data.ticketUrl}>{this.props.data.ticketUrl}</a>
            </div>
          </div>
        </div>

        <div>
          <button onClick={this.onEditClicked} className="btn btn-default">EDIT</button>
          <button onClick={this.onDeleteClicked} className="btn btn-danger">DELETE</button>
        </div>

        <Modal
          closeTimeoutMS={150}
          isOpen={this.state.pendingDelAck}
          onRequestClose={this.handleDelAckModalCloseRequest}
          style={modalStyles}>
          <h2>Are you sure you want to delete this record ?</h2>
          <div className="modal-btn-bar">
            <button
              className="btn btn-danger"
              onClick={this.handleDelAckModalConfirmRequest}>
              OK, trash it
            </button>
            <button
              className="btn btn-default"
              onClick={this.handleDelAckModalCloseRequest}>
              NO, keep it
            </button>
          </div>
        </Modal>

      </div>
    );
  }
}

FeatureDetails.propTypes = {
  data: featureDataType
};

export default FeatureDetails;
