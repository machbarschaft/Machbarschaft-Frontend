import apiUrl from './apiUrl';

/**
 * Helper can abort request
 */
export const putAbortResponse = async (processId) => {
  const endpoint = `${apiUrl()}/process/${processId}/response/abort`;

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
