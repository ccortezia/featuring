import React from 'react';
import classNames from 'classnames';
import {reduxForm} from 'redux-form';
import validate from './formValidation';
import * as CT from './constants';


export function UserEditForm(
  {fields: {fullname, currentPassword, newPassword, newPasswordCheck},
  handleSubmit, invalid, onCancel, data}) {

  const validationClasses = {
    fullname: {
      'has-success': fullname.dirty && !fullname.error,
      'has-error': (fullname.touched || fullname.dirty) && fullname.error
    },
    currentPassword: {
      'has-success': currentPassword.dirty && !currentPassword.error,
      'has-error': (currentPassword.touched || currentPassword.dirty) && currentPassword.error
    },
    newPassword: {
      'has-success': newPassword.dirty && !newPassword.error,
      'has-error': (newPassword.touched || newPassword.dirty) && newPassword.error
    },
    newPasswordCheck: {
      'has-success': newPasswordCheck.dirty && !newPasswordCheck.error,
      'has-error': (newPasswordCheck.touched || newPasswordCheck.dirty) && newPasswordCheck.error
    }
  };

  function helper(field, errorName, message) {
    return (field.touched || field.dirty) && field.error && field.error[errorName]
      && <small className="help-block">{[message]}</small>;
  }

  return (
    <form>

      <div className={classNames(["form-group", validationClasses.fullname])}>
        <label className="control-label">Full name</label>
        <input type="text" className="form-control" {...fullname} />
        {helper(fullname, 'required', 'A valid name is required')}
        {helper(fullname, 'minLength', `A valid name has at least ${fullname.error && fullname.error.minLength} characters`)}
        {helper(fullname, 'maxLength', `A valid name has no more than ${fullname.error && fullname.error.maxLength} characters`)}
      </div>

      <div>
        <div className={classNames(["form-group", validationClasses.currentPassword])}>
          <label className="control-label">Current password</label>
          <input type="text" className="form-control" {...currentPassword} />
        </div>

        <div className={classNames(["form-group", validationClasses.newPassword])}>
          <label className="control-label">New password</label>
          <input type="text"
            className="form-control"
            disabled={!currentPassword.value}
            {...newPassword} />
            {helper(newPassword, 'required', 'A valid new password is now required')}
        </div>

        <div className={classNames(["form-group", validationClasses.newPasswordCheck])}>
          <input type="text"
            className="form-control"
            placeholder="Please repeat the new password here"
            disabled={!newPassword.value}
            {...newPasswordCheck} />
          {helper(newPasswordCheck, 'required', 'Please double check your new password')}
          {helper(newPasswordCheck, 'mismatch', "Passwords didn't match")}
        </div>
      </div>

      <div>
        <button type="submit"
          className={classNames(["btn", "btn-success"])}
          onClick={handleSubmit}
          disabled={invalid}>SAVE
        </button>
        <button type="button"
          className="btn btn-default"
          onClick={onCancel}>CANCEL
        </button>
      </div>

    </form>
  );
}

const fields = [
  'fullname',
  'currentPassword',
  'newPassword',
  'newPasswordCheck'
];


export default reduxForm({
  form: 'userEditForm',
  fields,
  validate
})(UserEditForm);
