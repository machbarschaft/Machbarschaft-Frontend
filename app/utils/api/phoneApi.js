import apiUrl from './apiUrl';
import { objectToFormUrlEncoded } from './formUrlEncoder';

/**
 * Endpoint to confirm a TAN and thereby verify the phone number of a user.
 * @param formValues includes the phone number and the TAN
 * @returns {Promise<Response>}
 */
export const putConfirmTan = async (formValues) => {
  const endpoint = `${apiUrl()}phone/tan`;

  const formBody = objectToFormUrlEncoded(formValues);

  return fetch(endpoint, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: formBody,
  })
    .then((res) => {
      if (res.status === 200) {
        return;
      } else {
        throw Error(
          'Bei der Validierung deiner TAN ist ein Fehler aufgetreten. Verwendest du die richtige TAN?'
        );
      }
    })
    .catch((error) => {
      throw Error(
        'Bei der Validierung deiner TAN ist ein Fehler aufgetreten. Verwendest du die richtige TAN?'
      );
    });
};

/**
 * Endpoint to start the validation process of the phone number. User will be called.
 * @param formValues includes the phoneNumber
 * @returns {Promise<Response>}
 */
export const postRequestTan = async (formValues) => {
  const endpoint = `${apiUrl()}phone/tan`;

  let formBody = objectToFormUrlEncoded(formValues);

  // Right now: Only phone
  //formBody += '&sms=false';

  return fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: formBody,
  })
    .then((res) => {
      if (res.status === 201) {
        return;
      } else {
        throw Error(
          'Der Validierungsprozess konnte nicht gestartet werden. Bitte wende dich an den Support von MACHBARSCHAFT.'
        );
      }
    })
    .catch((error) => {
      throw Error(
        'Der Validierungsprozess konnte nicht gestartet werden. Bitte wende dich an den Support von MACHBARSCHAFT.'
      );
    });
};
