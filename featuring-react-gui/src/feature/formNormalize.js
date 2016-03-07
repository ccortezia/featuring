import moment from 'moment';


export function normalizeDeadline(value) {
  if (typeof value == 'string' && value.indexOf('/') != -1) {
    return moment(value, 'MM/DD/YYYY');
  }
  return value || null;
}
