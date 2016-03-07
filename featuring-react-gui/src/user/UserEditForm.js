import React from 'react';
import classNames from 'classnames';
import {reduxForm} from 'redux-form';
import validate from './formValidation';
import * as CT from './constants';


export function UserEditForm(
  {fields: {fullname}, handleSubmit, invalid, onCancel, data}) {

  const validationClasses = {
    fullname: {
      'has-success': fullname.dirty && !fullname.error,
      'has-error': (fullname.touched || fullname.dirty) && fullname.error
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
];


export default reduxForm({
  form: 'userEditForm',
  fields,
  validate
})(UserEditForm);
