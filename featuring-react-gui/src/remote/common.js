/*globals process*/


export function APIException(reason, details) {
  this.reason = reason;
  this.details = details;
  this.name = 'APIException';
}


export function apiRequest(method, url, data, token) {

  token = token || retrieveSessionToken();

  return fetch(baseUrl(url), {
      method: method,
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `Bearer ${token}`
      },
    })
    .catch((error) => {
      throw new APIException('offline');
    })
    .then(response => {
      if (!response.ok) {
        throw new APIException(extractReasonFromHttpError(response));
      }
      return response.json().catch(err => response);
    })
    .then(response => response.data);
}


/*
 * Default translator for values on a superagent response error.
 */
export function extractReasonFromHttpError(response) {
  // HTTP error, has some status to be decoded.
  if (response.status) {
    return {
      400: 'bad-request',
      401: 'unauthorized',
      500: 'server-error'
    }[response.status] || 'unknown';
  }

  console.error('Unknown HTTP error')
  // Error is under HTTP, possibly a network error.
  return 'offline';
}


export function interceptAPIError(err, history) {
  console.log(err);
  if (err && err.reason === 'unauthorized') {
      history.push('/login');
  }
}


export function baseUrl(url) {
  const base = process.env.NODE_ENV === 'production' ?
    process.env.REACT_APP_PROD_API_URL :
    process.env.REACT_APP_DEV_API_URL;
  return `${base}${url}`;
}


export const TOKEN_ID = 'authtoken';


export function retrieveSessionToken() {
  return localStorage.getItem(TOKEN_ID) || '';
}


export function persistSessionToken(token) {
  localStorage.setItem(TOKEN_ID, token);
}


export function destroySessionToken() {
  localStorage.removeItem(TOKEN_ID);
}


export function isLoggedIn() {
  return !!retrieveSessionToken();
}
