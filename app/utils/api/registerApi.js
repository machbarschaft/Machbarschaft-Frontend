import apiUrl from './apiUrl';
import { objectToFormUrlEncoded } from './formUrlEncoder';

export const postRegisterRequest = async (formValues) => {
  const endpoint = `${apiUrl()}auth/register`;

  const formBody = objectToFormUrlEncoded(formValues);

  return fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  }).then(async (res) => {
    return res;
  });
};
