import apiUrl from './apiUrl';
import { objectToFormUrlEncoded } from './formUrlEncoder';

export const putConfirmTan = async ({ formValues }) => {
  const endpoint = `${apiUrl()}phone`;

  const formBody = objectToFormUrlEncoded(formValues);

  return fetch(endpoint, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: formBody,
  });
};

export const postRequestTan = async ({ formValues }) => {
  const endpoint = `${apiUrl()}phone`;

  const formBody = objectToFormUrlEncoded(formValues);

  return fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: formBody,
  });
};
