import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import {requestSessionCreateAsyncAction} from 'app/session/actions';
import {persistSessionToken, destroySessionToken} from 'app/session/services';
import {browserHistory} from 'react-router';


export function LoginSection({onLogin, failure}) {
  return (
    <section className="login">
      <div className="logo"><h1>FEATURING</h1></div>
      <LoginForm onSubmit={onLogin} failure={failure}/>
    </section>
  );
}



function interpretFailure(reason) {
  return {
    'unauthorized': "Invalid credentials",
    'server-error': "Unexpected server error",
    'unknown': "Unknown failure",
    'offline': "Application is OFFLINE"
  }[reason];
}

export default connect(
  (state) => ({
    failure: interpretFailure(state.error && state.error['/login'] && state.error['/login'].reason),
  }),
  (dispatch) => ({
    onLogin: ({username, password}) => {
      return Promise.resolve()
        .then(() => destroySessionToken())
        .then(() => dispatch(requestSessionCreateAsyncAction({username, password, origin: '/login'})))
        .then((token) => persistSessionToken(token))
        .then(() => browserHistory.push("/"));
    }
  })
)
(LoginSection);
