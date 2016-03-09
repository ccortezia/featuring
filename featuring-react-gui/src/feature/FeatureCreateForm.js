import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {reduxForm} from 'redux-form';
import DatePicker from 'react-datepicker';
import {PRODUCT_AREA_ID_MAP, CLIENT_ID_MAP} from 'app/feature/constants';
import * as CT from './constants';
import validate from './formValidation';
import {normalizeDeadline} from './formNormalize';


export function FeatureCreateForm(
  {fields: {title, description, clientId, area, deadline, ticketUrl}, handleSubmit, invalid, onCancel}) {

  const validationClasses = {
    title: {
      'has-success': title.dirty && !title.error,
      'has-error': (title.touched || title.dirty) && title.error
    },
    description: {
      'has-success': description.dirty && !description.error,
      'has-error': (description.touched || description.dirty) && description.error
    },
    deadline: {
      'has-success': deadline.dirty && !deadline.error,
      'has-error': (deadline.touched || deadline.dirty) && deadline.error
    },
    ticketUrl: {
      'has-success': ticketUrl.dirty && !ticketUrl.error,
      'has-error': (ticketUrl.touched || ticketUrl.dirty) && ticketUrl.error
    }
  };

  function helper(field, errorName, message) {
    return (field.touched || field.dirty) && field.error && field.error[errorName]
      && <small className="help-block">{[message]}</small>;
  }

  return (
    <form>

      <div className={classNames(["form-group", validationClasses.title])}>
        <label className="control-label">Title</label>
        <input type="text" className="form-control" placeholder="Provide some short description here" {...title} autoFocus />
        {helper(title, 'required', 'A valid title is required')}
        {helper(title, 'minLength', `A valid title has at least ${title.error && title.error.minLength} characters`)}
        {helper(title, 'maxLength', `A valid title has no more than ${title.error && title.error.maxLength} characters`)}
      </div>

      <div className={classNames(["form-group", validationClasses.description])}>
        <label className="control-label">Description (optional)</label>
        <textarea rows="8" className="form-control"
          placeholder={`Provide a longer (max ${CT.DESCRIPTION_MAX_LENGTH} words) description of the feature here. Don't spare the words !`} {...description} />
        {helper(description, 'maxLength', `Please limit yourself to ${description.error && description.error.maxLength} characters`)}
      </div>

      <div className="form-group">
        <label className="control-label">Client</label>
        <div>
          <select {...clientId}>
            {
              Object.keys(CLIENT_ID_MAP).map((k) => {
                return <option key={k} value={k}>{CLIENT_ID_MAP[k]}</option>;
              })
            }
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="control-label">Product Area</label>
        <div>
          <select {...area}>
            {
              Object.keys(PRODUCT_AREA_ID_MAP).map((k) => {
                return <option key={k} value={k}>{PRODUCT_AREA_ID_MAP[k]}</option>;
              })
            }
          </select>
        </div>
      </div>

      <div className={classNames(["form-group", validationClasses.deadline])}>
        <label className="control-label">Target Date</label>
        <DatePicker dateFormat="MM/DD/YYYY" selected={deadline.value && moment(deadline.value)} {...deadline} />
        {helper(deadline, 'required', 'A valid target date is required')}
      </div>

      <div className={classNames(["form-group", validationClasses.ticketUrl])}>
        <label className="control-label">Ticket URL</label>
        <input type="text" className="form-control" placeholder="http://issue-tracker.company.org/issues/AAA-9080" {...ticketUrl} />
        {helper(ticketUrl, 'required', 'A valid ticket url is required')}
        {helper(ticketUrl, 'invalidFormat', 'A properly formatted url is required')}
      </div>

      <button type="submit"
        className={classNames(["btn", "btn-success"])}
        onClick={handleSubmit}
        disabled={invalid}>SAVE
      </button>

      <button type="button"
        className="btn btn-default"
        onClick={onCancel}>CANCEL
      </button>
    </form>
  );
}


// This object should be installed in the form reducer in order to transform
//  data prior to sending it through submission.
export const featureCreateFormNormalizer = {
  deadline: normalizeDeadline
};


const fields = [
  'title',
  'description',
  'clientId',
  'deadline',
  'area',
  'ticketUrl'
];

const initialValues = {
  area: 1,
  clientId: 1,
  deadline: moment()
};

export default reduxForm({
  form: 'featureCreateForm',
  fields,
  validate,
  initialValues
})(FeatureCreateForm);
