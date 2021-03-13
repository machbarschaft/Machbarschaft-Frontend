import apiUrl from './apiUrl';
import apiCall from './apiCall';

/**
 * Help seeker can reopen request
 */
export const putReopenRequest = async (requestId) => {
  const endpoint = `${apiUrl()}/request/${requestId}/reopen`;

  return fetch(endpoint, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 200) {
      return res;
    }
    res = await res.json();
    throw Error(res.errors[0]);
  });
};

/**
 * Help seeker can abort request
 */
export const putAbortRequest = async (processId) => {
  const endpoint = `${apiUrl()}/process/${processId}/request/abort`;

  return fetch(endpoint, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 200) {
      return;
    }
    res = await res.json();
    throw Error(res.errors[0]);
  });
};

/**
 * Help seeker can update status of request
 */
export const putUpdateRequestStatus = async (processId) => {
  const endpoint = `${apiUrl()}process/${processId}/response`;

  return fetch(endpoint, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 200) {
      return;
    }
    res = await res.json();
    throw Error(res.errors[0]);
  });
};

/**
 * Update status of request
 */
export const updateRequestStatus = async (request, status) => {
  try {
    if (request.requestStatus !== status) {
      return apiCall({
        url: `help-request/${request.id}/status`,
        method: 'PUT',
        data: { status }
      });
    }
  } catch (e) {
    console.warn(e);
  }
};
