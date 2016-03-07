import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {createErrorAlert} from 'app/common/alert';
import store from 'app/root/store';
import UserEditForm from './UserEditForm';
import UserRemoteAPI from './UserRemoteAPI';

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
    this.userAPI = new UserRemoteAPI();
    this.state = {data: null, err: null};
  }

  componentWillMount() {
    this.userAPI.get(this.props.params.username)
      .then((data) => this.setState({data}))
      .catch((err) => console.error(err)
        || browserHistory.push(`/users/${this.props.params.username}`))
  }

  onSubmit(submitedData) {
    const fullname = submitedData.fullname;
    const username = this.props.params.username;
    const obj = Object.assign({}, {username, fullname});
    store.dispatch(remoteRequestUserUpdateAction(obj))
      .then(() => store.dispatch(remoteRequestUserItemAction(username)))
      .then((result) => result && browserHistory.push(`/users/${username}`))
      .catch((err) => this.setState({err}));
  }

  onCancel() {
    browserHistory.push(`/users/${this.props.params.username}`);
  }

  acknowledgeError() {
    store.dispatch(ackFailureNetworkAction());
  }

  render() {
    return (
      <section className="user user-edit">
        {this.state.err && !this.state.err.ack && createErrorAlert(err)}
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
    err: state.error
  })
)(UserEditSection);
