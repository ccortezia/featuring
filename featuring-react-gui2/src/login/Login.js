import React from 'react';
import classNames from 'classnames';
import {SessionRemoteAPI, RegisterRemoteAPI, persistSessionToken} from '../remote';
import './Login.css'


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


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.handleLoginPathSelected = this.handleLoginPathSelected.bind(this);
    this.handleSignupPathSelected = this.handleSignupPathSelected.bind(this);
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

  onLogin() {
    this.props.history.push('/');
  }

  onSignup(data) {
    this.props.history.push('/');
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
          onSuccess={this.onLogin.bind(this)}
          failure={this.props.loginFailure}
        />

        <SignupForm
          className={this.classes('signup')}
          onSuccess={this.onSignup.bind(this)}
          failure={this.props.signupFailure}
        />

      </section>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitting: false, failure: undefined}
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({submitting: true, failure: null});

    (new SessionRemoteAPI())
      .create(event.target.elements.username.value, event.target.elements.password.value)
      .catch(error => {
        this.setState({submitting: false, failure: interpretLoginFailure(error.reason)});
      })
      .then(data => persistSessionToken(data.token))
      .then(() => {
        this.setState({submitting: false, failure: null});
        this.props.onSuccess();
      })
      ;
  }

  render() {
    return (
      <form className={classNames(["form-login", this.props.className])} onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <input name="username" type="text" autoFocus tabIndex="1" placeholder="Username" disabled={this.state.submitting} required/>
          <input name="password" type="password" tabIndex="1" placeholder="Password" disabled={this.state.submitting} required/>
        </div>

        <div>
          <input type="submit" className="btn btn-block" value="LOGIN" disabled={this.state.submitting || this.state.invalid}/>
        </div>

        <div className="login-status">
          {
            (this.state.failure && <span className="text-danger">{this.state.failure}</span>) ||
            (this.state.submitting && <i className="fa fa-lg fa-circle-o-notch fa-spin"></i>) ||
            undefined
          }
        </div>
      </form>
    );
  }
}


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitting: false, failure: undefined}
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({submitting: true, failure: null});

    const formData = {
      username: event.target.elements.username.value,
      fullname: event.target.elements.fullname.value,
      password: event.target.elements.password.value
    };

    // Naive Self Register.
    (new RegisterRemoteAPI())
      .register(formData.username, formData.fullname, formData.password)
      .catch(error => {
        this.setState({submitting: false, failure: interpretSignupFailure(error.reason)});
      })

      // Immediate logins.
      .then(() => (new SessionRemoteAPI()).create(formData.username, formData.password))
      .catch(error => {
        this.setState({submitting: false, failure: interpretLoginFailure(error.reason)});
      })
      .then(data => persistSessionToken(data.token))
      .then(() => {
        this.setState({submitting: false, failure: null});
        this.props.onSuccess();
      })
      ;
  }

  render() {
    return (
      <form className={classNames(["form-login", this.props.className])} onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <input name="username" type="text" autoFocus tabIndex="1" placeholder="Username" disabled={this.state.submitting} required/>
          <input name="fullname" type="text" autoFocus tabIndex="1" placeholder="Full Name" disabled={this.state.submitting} required/>
          <input name="password" type="password" tabIndex="1" placeholder="Password" disabled={this.state.submitting} required/>
        </div>

        <div>
          <input type="submit" className="btn btn-block" value="LOGIN" disabled={this.state.submitting || this.state.invalid}/>
        </div>

        <div className="login-status">
          {
            (this.state.failure && <span className="text-danger">{this.state.failure}</span>) ||
            (this.state.submitting && <i className="fa fa-lg fa-circle-o-notch fa-spin"></i>) ||
            undefined
          }
        </div>
      </form>
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
    'unique': "User already registered"
  }[reason];
}
