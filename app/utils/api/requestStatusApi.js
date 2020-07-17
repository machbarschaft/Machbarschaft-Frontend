import apiUrl from './apiUrl';

/**
 * Help seeker can reopen request
 */
export const postReopenRequest = async (requestId) => {
  const endpoint = `${apiUrl()}request/${requestId}/reopen`;

  console.log("reopen request (" + endpoint + ")");
  return fetch(endpoint, {
    method: 'PUT',
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
    throw Error(res.errors[0]); // ToDo: Throw multiple errors
  });
};



