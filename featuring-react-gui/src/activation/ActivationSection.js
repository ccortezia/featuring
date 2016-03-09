import React from 'react';
import Modal from 'react-modal';
import ActivationForm from './ActivationForm';
import SignupRemoteAPI from 'app/signup/SignupRemoteAPI';
import {browserHistory} from 'react-router';


export class ActivationSection extends React.Component {
  constructor({props}) {
    super({props});
    this.handleAckModalCloseRequest = this.handleAckModalCloseRequest.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {ackPending: false};
  }

  onSubmit(data) {
    const api = new SignupRemoteAPI();
    api.finish(this.props.params.uid, data.password)
      .then(() => this.setState({ackPending: true}))
      .catch((err) => console.error(err));
  }

  handleAckModalCloseRequest() {
    this.setState({ackPending: false});
    browserHistory.push('/login');
  }

  render() {
    return (
      <section className="activation">
        <h2>Activate your account with a password</h2>
        <ActivationForm onSubmit={this.onSubmit} />
        <Modal
          closeTimeoutMS={150}
          isOpen={this.state.ackPending}
          onRequestClose={this.handleAckModalCloseRequest}
          style={modalStyles}>
          <h2>Your account has been activated</h2>
          <div className="modal-btn-bar">
            <button
              className="btn btn-success"
              onClick={this.handleAckModalCloseRequest}>
              OK, got it
            </button>
          </div>
        </Modal>
      </section>
    );
  }
}


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


export default ActivationSection;
