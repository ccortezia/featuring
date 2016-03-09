import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {requestSessionCreateAsyncAction} from 'app/session/actions';
import {persistSessionToken, destroySessionToken} from 'app/session/services';
import {requestSignupCreateAsyncAction} from 'app/signup/actions';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';


function EntryChoice({onSelectLogin, onSelectSignup, className}) {
  return (
    <form className={classNames(["form-choice", className])}>
      <input type="button"
        className="btn btn-block"
        value="LOGIN"
        onClick={onSelectLogin}
      />
      <input type="button"
        className="btn btn-block"
        value="REGISTER"
        onClick={onSelectSignup}
      />
    </form>
  );
}


function SignupOk({onConfirm, email, className}) {
  return (
    <form className={classNames(["form-signup-ok", className])}>
      <h2>Almost done !</h2>
      <p>An email has been sent to {email} with instructions on how to proceed</p>
      <input type="button"
        className="btn btn-block"
        value="OK"
        onClick={onConfirm}
      />
    </form>
  );
}


export class LoginSection extends React.Component {

  constructor({props}) {
    super({props});
    this.handleLoginPathSelected = this.handleLoginPathSelected.bind(this);
    this.handleSignupPathSelected = this.handleSignupPathSelected.bind(this);
    this.onConfirmSignupOk = this.onConfirmSignupOk.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.classes = this.classes.bind(this);
    this.state = {
      signup: {email: null},
      show: {choice: true, login: false, signup: false}
    };
  }

  handleLoginPathSelected() {
    this.setState({
      show: {choice: false, login: true, signup: false, signupOk: false}
    });
  }

  handleSignupPathSelected() {
    this.setState({
      show: {choice: false, login: false, signup: true, signupOk: false}
    });
  }

  onSignup(data) {
    return this.props.onSignup(data).then((result) => {
      this.setState({
        signup: {email: data.email},
        show: {choice: false, login: false, signup: false, signupOk: true}
      });
    })
  }

  onConfirmSignupOk() {
    this.setState({
      show: {choice: false, login: true, signup: false, signupOk: false}
    });
  }

  classes(section) {
    return classNames({
      show: this.state.show[section],
      hide: !this.state.show[section]
    });
  }

  render() {
    return (
      <section className="login">
        <div className="logo"><h1>FEATURING</h1></div>

        <EntryChoice
          className={this.classes('choice')}
          onSelectLogin={this.handleLoginPathSelected}
          onSelectSignup={this.handleSignupPathSelected}
        />

        <LoginForm
          className={this.classes('login')}
          onSubmit={this.props.onLogin}
          failure={this.props.loginFailure}
        />

        <SignupForm
          className={this.classes('signup')}
          onSubmit={this.onSignup}
          failure={this.props.signupFailure}
        />

        <SignupOk
          className={this.classes('signupOk')}
          onConfirm={this.onConfirmSignupOk}
          email={this.state.signup.email}
        />
      </section>
    );
  }
}



function interpretLoginFailure(reason) {
  return {
    'unauthorized': "Invalid credentials",
    'server-error': "Unexpected server error",
    'unknown': "Unknown failure",
    'offline': "Application is OFFLINE"
  }[reason];
}


function interpretSignupFailure(reason) {
  return {
    'unique': "User already registered",
  }[reason];
}


export default connect(
  (state) => ({
    loginFailure: interpretLoginFailure(
                    state.error
                    && state.error['/login']
                    && state.error['/login'].reason),
    signupFailure: interpretSignupFailure(
                    state.error
                    && state.error['/signup']
                    && state.error['/signup'].reason
                    && state.error['/signup'].reason.app)
  }),
  (dispatch) => ({
    onLogin: ({username, password}) => {
      return Promise.resolve()
        .then(() => destroySessionToken())
        .then(() => dispatch(requestSessionCreateAsyncAction({username, password, origin: '/login'})))
        .then((token) => persistSessionToken(token))
        .then(() => browserHistory.push("/"));
    },
    onSignup: ({username, email, fullname}) => {
      return Promise.resolve()
        .then(() => dispatch(requestSignupCreateAsyncAction({username, email, fullname, origin: '/signup'})))
    }
  })
)
(LoginSection);
