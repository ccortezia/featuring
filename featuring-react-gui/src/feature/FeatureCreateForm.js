import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import DatePicker from 'react-datepicker';
import {isUrl} from 'app/common/utils';
import {PRODUCT_AREA_ID_MAP, CLIENT_ID_MAP} from 'app/feature/constants';


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
      </div>

      <div className={classNames(["form-group", validationClasses.description])}>
        <label className="control-label">Description (optional)</label>
        <textarea rows="8" className="form-control"
          placeholder="Provide a longer (max 300 words) description of the feature here. Don't spare the words !" {...description} />
        {helper(description, 'maxWords', `Please limit yourself to ${description.error && description.error.maxWords} words`)}
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

      <div className="feature-detail-field">
        <label>Target Date</label>
        <DatePicker dateFormat="MM/DD/YYYY" selected={moment(deadline.value)} {...deadline} />
      </div>

      <div className={classNames(["form-group", validationClasses.ticketUrl])}>
        <label className="control-label">Ticket URL</label>
        <input type="text" className="form-control" placeholder="http://company.jira/issues/AAA-9080" {...ticketUrl} />
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


function validate(values) {
  let err = {};

  if (!values.title) {
    err.title = {required: true};
  } else if (values.title.length < 10) {
    err.title = {minLength: 10};
  }

  if (values.description && values.description.split(' ').length > 300) {
    err.description = {maxWords: 300};
  }

  if (!values.ticketUrl) {
    err.ticketUrl = {required: true};
  } else if (!isUrl(values.ticketUrl)) {
    err.ticketUrl = {invalidFormat: true};
  }

  return err;
}


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
  clientId: 1
};

export default reduxForm({
  form: 'featureCreateForm',
  fields,
  validate,
  initialValues
})(FeatureCreateForm);
