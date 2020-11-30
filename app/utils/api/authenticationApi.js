/**
 * HTTP request to perform login. Request is not cached and credentials are included to enable receiving cookie (see: https://github.com/github/fetch/issues/386)
 * @param email is the email address of the user to be authenticated
 * @param password is the password of the user to be authenticated
 * @returns {Promise<Response>} the unparsed response of the backend
 */
// import { objectToFormUrlEncoded } from './formUrlEncoder';
import firebase from '../../components/firebase';
import apiUrl from './apiUrl';

export const putLogin = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => res);
};

/**
 * HTTP request to perform user lookup (i.e. 'who is authenticated?')
 * @returns {Promise<Response>} the unparsed response of the backend (contains user information)
 */
export const getAuthenticate = () => {
  return firebase
    .auth()
    .currentUser()
    .then((res) => res)
    .catch((err) => console.error(err));
};

/**
 * HTTP request to invalidate (logout) a user
 * @returns {Promise<Response>} the unparsed response of the backend
 */
export const putLogout = () => {
  const endpoint = `${apiUrl()}/auth/logout`;

  return fetch(endpoint, {
    method: 'PUT',
    cache: 'no-cache',
    credentials: 'include',
  }).then((res) => res);
};
