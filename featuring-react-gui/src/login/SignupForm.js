import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';


export function SignupForm({fields: {username, fullname, email}, submitting, handleSubmit, invalid, error, failure, className}) {
  return (
    <form className={classNames(["form-signup", className])} onSubmit={handleSubmit}>
      <div>
        <input type="text"
          autoFocus
          tabIndex="1"
          placeholder="Username"
          disabled={submitting}
          {...username} />
        <input type="email"
          tabIndex="1"
          placeholder="Email"
          disabled={submitting}
          {...email} />
        <input type="text"
          tabIndex="1"
          placeholder="Full name"
          disabled={submitting}
          {...fullname} />
      </div>

      <div>
        <input type="submit"
          className="btn btn-block"
          value="REGISTER"
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
  if (!values.fullname) {
    errors.fullname = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
}


const fields = ['username', 'email', 'fullname'];

export default reduxForm({
  form: 'registerForm',
  fields,
  validate
})(SignupForm);
