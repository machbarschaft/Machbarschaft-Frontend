import apiUrl from './apiUrl';

/**
 * Get active requests for displaying on dashboard.
 * @returns current request
 */
export const getActiveRequests = async () => {
  const endpoint = `${apiUrl()}/dashboard/active-requests`;

  return fetch(endpoint, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 200) {
      res = await res.json();
      return res;
    }
    res = await res.json();
    throw Error(res.errors[0]);
  });
};

/**
 * Get finished requests for displaying on dashboard.
 * @returns old requests
 */
export const getFinishedRequests = async () => {
  const endpoint = `${apiUrl()}/dashboard/finished-requests`;

  return fetch(endpoint, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 200) {
      res = await res.json();
      return res;
    }
    res = await res.json();
    throw Error(res.errors[0]);
  });
};
