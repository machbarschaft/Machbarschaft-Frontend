import React from 'react';
import apiUrl from './apiUrl';
import { objectToFormUrlEncoded } from './formUrlEncoder';

/**
 * Creates a new help request, either for a guest or an authentciated user.
 * @param formValues
 * @param isAuthenticated
 * @returns an object containing the processID of the created help request or an error
 */
export const postPlaceRequest = async ({ formValues, isAuthenticated }) => {
  const endpoint = isAuthenticated
    ? `${apiUrl()}request`
    : `${apiUrl()}request/guest?phone=${formValues.phoneNumber}`;

  return fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 200) {
      res = await res.json();
      return res; // ToDo: Change to Process ID
    }
    res = await res.json();
    throw Error(res.errors[0]); // ToDo: Throw multiple errors
  });
};

/**
 * Updates data in an existing help request.
 * @param processID
 * @param phoneNumber
 * @param formValues the necessary values (see Swagger backend docs)
 * @param isAuthenticated
 * @returns {Promise<Response>}
 */
export const putPlaceRequest = async ({
  processID,
  phoneNumber,
  formValues,
  isAuthenticated,
}) => {
  const endpoint = isAuthenticated
    ? `${apiUrl()}request/${processID}`
    : `${apiUrl()}request/guest/${processID}?phone=${encodeURIComponent(
        phoneNumber
      )}`;

  const formBody = objectToFormUrlEncoded(formValues);

  return fetch(endpoint, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: formBody,
  }).then(async (res) => {
    if (res.status === 200) {
      res = await res.json();
      return res;
    }
    throw new Error('Beim Schreiben der Daten ist ein Fehler aufgetreten.');
  });
};

/**
 * Publish the help request, if all data has been entered.
 * @param processID
 * @param phoneNumber
 * @param isAuthenticated
 * @returns {Promise<Response>}
 */
export const putPublishRequest = ({
  processID,
  phoneNumber,
  isAuthenticated,
}) => {
  const endpoint = isAuthenticated
    ? `${apiUrl()}request/${processID}/publish`
    : `${apiUrl()}request/guest/${processID}/publish?phone=${encodeURIComponent(
        phoneNumber
      )}`;

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
    throw new Error('Die Anfrage konnte nicht veröffentlicht werden.');
  });
};

/**
 * Creates a new address entry
 * @param formValues the necessary values (see Swagger backend docs)
 * @returns {Promise<Response>}
 */
export const postAddress = ({ formValues }) => {
  const endpoint = `${apiUrl()}address`;

  const formBody = objectToFormUrlEncoded(formValues);

  return fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: formBody,
  }).then(async (res) => {
    if (res.status === 200) {
      const jsonRes = await res.json();
      return jsonRes._id;
    } else {
      throw Error('Die Adresse konnte nicht angelegt werden.');
    }
  });
};
