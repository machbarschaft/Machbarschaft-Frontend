import apiUrl from './apiUrl';
import { objectToFormUrlEncoded } from './formUrlEncoder';
import apiCall from './apiCall';

/**
 * Endpoint to update user.
 * @param formValues
 * @returns {Promise<Response>}
 */
export const updateUser = async (formValues) => {
  return apiCall({
    url: `user`,
    method: 'PUT',
    data: { ...formValues },
  });
};

/**
 * Endpoint to save user preferences.
 * @param formValues include forename and surname
 * @returns {Promise<Response>}
 */
export const putUserProfile = async (formValues) => {
  const endpoint = `${apiUrl()}/user/profile`;

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
      }
      throw Error('Das Speichern Ihres Profils ist fehlgeschlagen.');
    })
    .catch(() => {
      throw Error('Das Speichern Ihres Profils ist fehlgeschlagen.');
    });
};

/**
 * Endpoint to save user preferences.
 * @param formValues can include the address(street, houseNumber, zipCode, city, country), the radius, useGPS and notifyNearbyRequests
 * @returns {Promise<Response>}
 */
export const putUserPreferences = async (formValues) => {
  const endpoint = `${apiUrl()}/user/preferences`;

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
      }
      throw Error('Das Speichern Ihrer Einstellungen ist fehlgeschlagen.');
    })
    .catch(() => {
      throw Error('Das Speichern Ihrer Einstellungen ist fehlgeschlagen.');
    });
};

/**
 * Endpoint to get user preferences.
 * @returns {Promise<Response>}
 */
export const getUserPreferences = async () => {
  const endpoint = `${apiUrl()}/user/preferences`;

  return fetch(endpoint, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  })
    .then(async (res) => {
      if (res.status === 200) {
        res = await res.json();
        return res;
      }
      throw Error('Einstellungen konnten nicht geladen werden.');
    })
    .catch(() => {
      throw Error('Einstellungen konnten nicht geladen werden.');
    });
};

export const updateUserRole = async (email) => {
  return apiCall({
    url: `admin/users/setadmin/${email}`,
    method: 'PUT',
    data: {},
  });
};
