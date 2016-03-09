import React from 'react';
import classNames from 'classnames';
import {reduxForm} from 'redux-form';


export function ActivationForm({fields: {password, passwordCheck}, handleSubmit, invalid}) {

  const validationClasses = {
    password: {
      'has-success': password.dirty && !password.error,
      'has-error': (password.touched || password.dirty) && password.error
    },
    passwordCheck: {
      'has-success': passwordCheck.dirty && !passwordCheck.error,
      'has-error': (passwordCheck.touched || passwordCheck.dirty) && passwordCheck.error
    }
  };

  function helper(field, errorName, message) {
    return (field.touched || field.dirty) && field.error && field.error[errorName]
      && <small className="help-block">{[message]}</small>;
  }

  return (
    <form>

      <div>
        <div className={classNames(["form-group", validationClasses.password])}>
          <label className="control-label">New password</label>
          <input type="text"
            className="form-control"
            {...password} />
            {helper(password, 'required', 'A valid new password is required')}
        </div>
        <div className={classNames(["form-group", validationClasses.passwordCheck])}>
          <input type="text"
            className="form-control"
            placeholder="Please repeat the new password here"
            disabled={!password.value}
            {...passwordCheck} />
          {helper(passwordCheck, 'required', 'Please double check your new password')}
          {helper(passwordCheck, 'mismatch', "Passwords didn't match")}
        </div>
      </div>

      <div>
        <button type="submit"
          className={classNames(["btn", "btn-success", "btn-block"])}
          onClick={handleSubmit}
          disabled={invalid}>CONFIRM
        </button>
      </div>

    </form>
  );
}


const fields = [
  'password',
  'passwordCheck'
];


function validate(values) {
  let err = {};

  if (!values.password) {
    err.password = {required: true};
  }
  else if (!values.passwordCheck) {
    err.passwordCheck = {required: true};
  }
  else if (values.password != values.passwordCheck) {
    err.passwordCheck = {mismatch: true};
  }

  return err;
}


export default reduxForm({
  form: 'activationForm',
  fields,
  validate
})(ActivationForm);
