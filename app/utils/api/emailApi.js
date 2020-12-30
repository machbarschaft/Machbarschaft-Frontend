import apiUrl from './apiUrl';

/**
 * Endpoint to send confirmation email
 */
export const getConfirmEmail = async () => {
  const endpoint = `${apiUrl()}/auth/resendEmail`;

  return fetch(endpoint, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  })
    .then((res) => {
      if (res.status === 200) {
        return;
      }
      throw Error('Die Anfrage konnte nicht gesendet werden.');
    })
    .catch((error) => {
      throw Error('Die Anfrage konnte nicht gesendet werden.');
    });
};
