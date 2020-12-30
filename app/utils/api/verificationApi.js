import apiUrl from './apiUrl';

/**
 * verify email
 */
export const getVerifyEmail = async (token) => {
  const endpoint = `${apiUrl()}/auth/verify/${token}`;

  return fetch(endpoint, {
    method: 'GET',
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
