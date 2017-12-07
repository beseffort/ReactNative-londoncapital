import { stringify } from 'qs';

function accessTokenQuery() {
  const accessToken = null;
  if (accessToken) {
    return { access_token: accessToken };
  }
  return {};
}

function queryWithAuth(query, auth = true) {
  return auth ?
    stringify({ ...query, ...accessTokenQuery() }) :
    stringify(query);
}

export function makeApiUrl(endpoint, query, auth = true) {
  const queryString = queryWithAuth(query, auth);
  return `${endpoint}?${queryString}`;
}

function checkStatus(response) {
  if (response.status < 400) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function processError() {
  return error => ({ error });
}

function processResponse(response) {
  return response
    .json()
    .then(body => ({
      response: {
        headers: response.headers,
        body,
        status: response.status,
      },
    }));
}

export function get(endpoint, query, { auth = true } = {}) {
  const url = makeApiUrl(endpoint, query, auth);
  return fetch(url)
    .then(checkStatus)
    .then(processResponse)
    .catch(processError());
}

function postOrPatch(method, endpoint, { query, auth = true, requestBody = {} } = {}) {
  const url = makeApiUrl(endpoint, query, auth);
  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json; version=1',
    },
    body: JSON.stringify(requestBody),
  })
    .then(checkStatus)
    .then(processResponse)
    .catch(processError());
}

export function post(endpoint, { query = {}, auth = true, requestBody = {} } = {}) {
  return postOrPatch('POST', endpoint, { query, auth, requestBody });
}

export function patch(endpoint, { query = {}, auth = true, requestBody = {} } = {}) {
  return postOrPatch('PATCH', endpoint, { query, auth, requestBody });
}
