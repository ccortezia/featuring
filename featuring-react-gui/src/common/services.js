
/*
 * Default translator for values on a superagent response error.
 */
export function extractReasonFromHttpError(err) {
  // HTTP error, has some status to be decoded.
  if (err.status) {
    return {
      400: 'unauthorized',
      401: 'unauthorized',
      500: 'server-error'
    }[err.status] || 'unknown';
  }
  // Error is under HTTP, possibly a network error.
  return 'offline';
}


export function api(url) {
  let host = process.env.API_HOST
  let base = '/api/v1';
  return `${host}${base}${url}`;
}
