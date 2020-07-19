import apiUrl from './apiUrl';
import { objectToFormUrlEncoded } from './formUrlEncoder';

/**
 * Get open requests in specified radius of user's location.
 * @param longitude
 * @param latitude
 * @param radius
 * @returns open requests
 */
export const getOpenRequests = async ({ longitude, latitude, radius }) => {
  const params = objectToFormUrlEncoded({
    longitude: longitude,
    latitude: latitude,
    radius: radius,
  });
  const endpoint = `${apiUrl()}request/open-requests?${params}`;

  return fetch(endpoint, {
    method: 'GET',
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
    throw Error(res.errors[0]);
  });
};

/**
 * Accept open request
 * @param requestId
 */
export const acceptOpenRequest = async ({ requestId }) => {
  const endpoint = `${apiUrl()}process/${requestId}/response`;

  return fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 201) {
      return;
    }
    res = await res.json();
    throw Error(res.errors[0]);
  });
};
