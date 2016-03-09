import classNames from 'classnames';
import React from 'react';
import {reduxForm} from 'redux-form';


export function LoginForm({fields: {username, password}, submitting, handleSubmit, invalid, failure, className}) {
  return (
    <form className={classNames(["form-login", className])} onSubmit={handleSubmit}>
      <div>
        <input type="text"
          autoFocus
          tabIndex="1"
          placeholder="Username"
          disabled={submitting}
          {...username} />
        <input type="password"
          tabIndex="1"
          placeholder="Password"
          disabled={submitting}
          {...password} />
      </div>

      <div>
        <input type="submit"
          className="btn btn-block"
          value="LOGIN"
          disabled={submitting || invalid}
        />
      </div>

      <div className="login-status">
      {
        (failure && <span className="text-danger">{failure}</span>) ||
        (submitting && <i className="fa fa-lg fa-circle-o-notch fa-spin"></i>) ||
        undefined
      }
      </div>
    </form>
  );

}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
}


const fields = ['username', 'password'];

export default reduxForm({
  form: 'loginForm',
  fields,
  validate
})(LoginForm);
