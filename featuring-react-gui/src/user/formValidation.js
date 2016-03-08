import {isUrl} from 'app/common/utils';
import * as CT from './constants';


export default function validate(values) {
  let err = {};

  if (!values.fullname) {
    err.fullname = {required: true};
  }
  else if (values.fullname.length < CT.FULLNAME_MIN_LENGTH) {
    err.fullname = {minLength: CT.FULLNAME_MIN_LENGTH};
  }
  else if (values.fullname.length > CT.FULLNAME_MAX_LENGTH) {
    err.fullname = {maxLength: CT.FULLNAME_MAX_LENGTH};
  }

  if (values.currentPassword) {
    if (!values.newPassword) {
      err.newPassword = {required: true};
    }
    else if (!values.newPasswordCheck) {
      err.newPasswordCheck = {required: true};
    }
    else if (values.newPassword != values.newPasswordCheck) {
      err.newPasswordCheck = {mismatch: true};
    }
  }

  return err;
}
