/**
 * HTTP request to perform login. Request is not cached and credentials are included to enable receiving cookie (see: https://github.com/github/fetch/issues/386)
 * @param email is the email address of the user to be authenticated
 * @param password is the password of the user to be authenticated
 * @returns {Promise<Response>} the unparsed response of the backend
 */
import firebase from '../../components/firebase';
import apiCall from './apiCall';

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
export const getAuthenticate = async() => {
  const idToken = await firebase.auth().currentUser?.getIdToken(true) || localStorage.getItem('token');
  if (!idToken) return;

  const response = await apiCall({
    url: 'user'
  });

  if (response.status >= 400) {
    throw response.data;
  }
  return response.data;
};

export const sendPasswordReset = (email) => {
  return firebase
    .auth()
    .sendPasswordResetEmail(email);
};

export const checkPassbaseId = (uid) => {
    return apiCall({
      url: `passbase/${uid}`
    });
};
