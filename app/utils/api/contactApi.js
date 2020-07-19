import apiUrl from './apiUrl';
import { objectToFormUrlEncoded } from './formUrlEncoder';

export const postContactRequest = async (formValues) => {
  const endpoint = `${apiUrl()}contact`;

  const formBody = objectToFormUrlEncoded(formValues);

  return fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  })
    .then((res) => {
      if (res.status === 200) {
        return;
      } else {
        throw Error(
          'Beim Absenden der Anfrage ist ein Fehler aufgetreten. Versuchen Sie es später erneut.'
        );
      }
    })
    .catch((error) => {
      throw Error(
        'Beim Absenden der Anfrage ist ein Fehler aufgetreten. Versuchen Sie es später erneut.'
      );
    });
};
