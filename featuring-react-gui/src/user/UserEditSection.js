import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {createErrorAlert} from 'app/common/alert';
import store from 'app/root/store';
import {ackErrorAction} from 'app/error/actions';
import UserEditForm from './UserEditForm';

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
    const origin = this.props.location.pathname;
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
    const username = this.props.params.username;
    const data = Object.assign({}, {username, fullname});
    const origin = this.props.location.pathname;
    store.dispatch(remoteRequestUserUpdateAction({data, origin}))
      .then((result) => result && browserHistory.push(`/users/${username}`))
      .catch((err) => this.setState({err}));
  }

  onCancel() {
    browserHistory.push(`/users/${this.props.params.username}`);
  }

  acknowledgeError() {
    const origin = this.props.location.pathname;
    store.dispatch(ackErrorAction({origin}));
  }

  errorBanner() {
    const origin = this.props.location.pathname;
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
