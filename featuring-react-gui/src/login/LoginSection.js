import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import {requestSessionCreateAsyncAction} from 'app/session/actions';
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
    'unauthorized': "Não autorizado",
    'server-error': "Oh damn",
    'unknown': "Um problema desconhecido",
    'offline': "Sem conexão"
  }[reason];
}

export default connect(
  (state) => ({
    failure: interpretFailure(state.session && state.session.failure && state.session.reason),
  }),
  (dispatch) => ({
    onLogin: ({username, password}) => {
      return dispatch(requestSessionCreateAsyncAction(username, password))
        .then(() => browserHistory.push("/"));
    }
  })
)
(LoginSection);
