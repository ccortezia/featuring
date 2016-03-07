import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import store from 'app/root/store';
import UserEditForm from './UserEditForm';
import {remoteRequestUserUpdateAction} from './actions';


export function UserEditSection({data, err}) {

  function onSubmit(submitedData) {
    const obj = Object.assign({}, submitedData, {username: data.username});
    store.dispatch(remoteRequestUserUpdateAction(obj))
      .then((result) => result && browserHistory.push(`/users/${data.username}`));
  }

  function onCancel() {
    browserHistory.push(`/users/${data.id}`);
  }

  function acknowledgeError() {
    store.dispatch(ackFailureNetworkAction())
  }

  return (
    <section className="user user-edit">
      {err && !err.ack && createErrorAlert(err, acknowledgeError)}
      <h2>Edit this account profile</h2>
      <UserEditForm initialValues={data} onSubmit={onSubmit} onCancel={onCancel} />
    </section>
  );
}


export default connect(
  (state) => ({
    data: state.session
  })
)(UserEditSection);
