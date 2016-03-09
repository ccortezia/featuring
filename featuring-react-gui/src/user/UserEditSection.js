import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {createErrorAlert} from 'app/common/alert';
import store from 'app/root/store';
import {ackErrorAction} from 'app/error/actions';
import UserEditForm from './UserEditForm';
import {requestSessionCreateAsyncAction} from 'app/session/actions';

import {
  remoteRequestUserItemAction,
  remoteRequestUserUpdateAction
} from './actions';


export class  UserEditSection extends React.Component {

  constructor({props}) {
    super({props});
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.acknowledgeError = this.acknowledgeError.bind(this);
    this.errorBanner = this.errorBanner.bind(this);
    this.state = {data: null};
  }

  componentWillMount() {
    this.setState({origin: this.props.location.pathname});
    const origin = this.state.origin;
    const username = this.props.params.username;
    store.dispatch(remoteRequestUserItemAction({username, origin}))
      .then((action) => action.data)
      .then((data) => this.setState({data}))
      .catch((err) => console.error(err)
        || browserHistory.push(`/`));
  }

  componentWillUnmount() {
    this.acknowledgeError();
  }

  onSubmit(submitedData) {
    const fullname = submitedData.fullname;
    const password = submitedData.newPassword;
    const currentPassword = submitedData.currentPassword;
    const username = this.props.params.username;
    const data = Object.assign({}, {username, fullname, password});
    const origin = this.state.origin;
    const promise = currentPassword ?
      store.dispatch(requestSessionCreateAsyncAction({
        origin, username, password: currentPassword
      })) : Promise.resolve();
    promise
      .then(() => store.dispatch(remoteRequestUserUpdateAction({data, origin})))
      .then((result) => result && browserHistory.push(`/users/${username}`));
  }

  onCancel() {
    browserHistory.push(`/users/${this.props.params.username}`);
  }

  acknowledgeError() {
    store.dispatch(ackErrorAction({origin: this.state.origin}));
  }

  errorBanner() {
    const origin = this.state.origin;
    const error = this.props.error && this.props.error[origin];
    return error && !error.ack && createErrorAlert(error, this.acknowledgeError);
  }

  render() {
    return (
      <section className="user user-edit">
        {this.errorBanner()}
        <h2>Edit this account profile</h2>
        <UserEditForm
          initialValues={this.state.data}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel} />
      </section>
    );
  }
}


export default connect(
  (state) => ({
    error: state.error
  })
)(UserEditSection);
