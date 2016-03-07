import {isUrl} from 'app/common/utils';
import * as CT from './constants';


export default function validate(values) {
  let err = {};

  if (!values.title) {
    err.title = {required: true};
  }
  else if (values.title.length < CT.TITLE_MIN_LENGTH) {
    err.title = {minLength: CT.TITLE_MIN_LENGTH};
  }
  else if (values.title.length > CT.TITLE_MAX_LENGTH) {
    err.title = {maxLength: CT.TITLE_MAX_LENGTH};
  }

  if (values.description && values.description.length > CT.DESCRIPTION_MAX_LENGTH) {
    err.description = {maxLength: CT.DESCRIPTION_MAX_LENGTH};
  }

  if (!values.deadline) {
    err.deadline = {required: true};
  }

  if (!values.ticketUrl) {
    err.ticketUrl = {required: true};
  }
  else if (!isUrl(values.ticketUrl)) {
    err.ticketUrl = {invalidFormat: true};
  }

  return err;
}
