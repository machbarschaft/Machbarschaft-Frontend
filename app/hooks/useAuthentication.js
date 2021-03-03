import React from 'react';
import {
  getAuthenticate,
  putLogin,
} from '../utils/api/authenticationApi';
import postRegisterRequest from '../utils/api/registerApi';
import authenticationReducer, { initialAuthenticationState } from '../contexts/authentication/authenticationReducer';
import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_SUCCESS,
  INVALIDATE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_INIT,
  REGISTER_FAILURE,
  REGISTER_INIT,
} from '../contexts/authentication/types';
import firebase from '../components/firebase';

/**
 * The custom hook useAuthentication holds the current authentication data. It provides information about the authenticated user (if any)
 * as well as methods to login (verify), check and invalidate the authentication.
 * Information is available to the render tree via AuthenticationContext. Components that need to access any of these data, can just use 'React.useContext(AuthenticationContext)'.
 *
 * @returns {[{uid: null, email: null}, {invalidateAuthentication: (function(): boolean), checkAuthentication: checkAuthentication}]}
 */
export default function useAuthentication() {
  const [authenticationState, dispatch] = React.useReducer(
    authenticationReducer,
    initialAuthenticationState
  );

  const isAuthenticated = () => authenticationState.uid !== null;

  const isMailVerified = () => authenticationState.emailVerified;

  const isPhoneVerified = () => authenticationState.phoneVerified;

  /* Check for authentication on first build */
  React.useEffect(() => {
    checkAuthentication();
  }, []);

  /**
   * Makes a request to the backend to register a user. If successful, authenticates in one go
   * @param email the email of the user to be registered
   * @param phone the phone number of the user to be registered
   * @param password the password of the user to be registered
   * @param forename the forename of the user to be registered
   * @param surname the surname of the user to be registered
   */
  const performRegister = async (
    email,
    phone,
    countryCode,
    password,
    forename,
    surname
  ) => {
    phone = phone.replace(/\D/g, '');

    const formValues = {
      email,
      phone,
      countryCode,
      password,
      forename,
      surname,
    };

    dispatch({
      type: REGISTER_INIT,
    });

    try {
      let registerResult = await postRegisterRequest(formValues);
      // TODO: requires a backend change to return a normal 201 for create a new object
      if (registerResult.status !== 200) {
        // Register: Failure
        // TODO: clarify why we do this here - because we do not dispatch the data
        switch (registerResult.status) {
          case 422:
            // Invalid Request
            dispatch({
              type: REGISTER_FAILURE,
              data: {
                errors: [
                  'Das Passwort muss mindestens fünf Zeichen lang sein.',
                ],
              },
            });
            return false;
          case 400:
            // User exists
            dispatch({
              type: REGISTER_FAILURE,
              data: {
                errors: [
                  'Registrierung fehlgeschlagen. Ist die Email oder Telefonnummer bei einem anderen Konto auf Machbarschaft registriert?',
                ],
              },
            });
            return false;
          case 500:
            // Internal server error
            dispatch({
              type: REGISTER_FAILURE,
              data: {
                errors: [
                  'Registrierung fehlgeschlagen. Ist die Email oder Telefonnummer bei einem anderen Konto auf Machbarschaft registriert?',
                ],
              },
            });
            return false;
          default:
            // Unknown Error
            dispatch({
              type: REGISTER_FAILURE,
              data: {
                errors: [
                  'Registrierung fehlgeschlagen. Versuchen Sie es noch einmal',
                ],
              },
            });
            return false;
        }
      }
      return await performAuthentication(email, password);
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        data: {
          errors: [
            'Registrierung fehlgeschlagen. Ist die Email oder Telefonnummer bei einem anderen Konto auf Machbarschaft registriert? Oder hat das Passwort weniger als sechs Zeichen?',
          ],
        },
      });
      return false;
    }
  };

  /**
   * Makes a request to the backend in order to authenticate a user and modifies state accordingly
   * @param email the email of the user to be authenticated
   * @param password the password of the user to be authenticated
   */
  const performAuthentication = async (email, password) => {
    dispatch({
      type: LOGIN_INIT,
    });

    try {
      const loginResult = await putLogin(email, password);
      if (loginResult.user.email === email) {
        return await checkAuthentication();
      }
      dispatch({
        type: LOGIN_FAILURE,
        data: {
          errors: ['Zu dieser Kombination konnten wir keinen Benutzer finden.'],
        },
      });
      return false;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        data: {
          errors: [
            'Die Anmeldung konnte nicht durchgeführt werden, bitte versuchen Sie es erneut.',
          ],
        },
      });
      return false;
    }
  };

  /**
   * Makes a request to the backend in order to get information about the authenticated user (if any) and modifies state accordingly
   */
  const checkAuthentication = async () => {
    try {
      const authResult = await getAuthenticate();
      if (authResult) {
        const idToken = await firebase.auth().currentUser?.getIdToken() || localStorage.getItem('token');
        localStorage.setItem('token', idToken);
        dispatch({
          type: AUTHENTICATION_SUCCESS,
          data: {
            uid: authResult.id,
            email: authResult.email,
            phoneNumber: authResult.phone,
            countryCode: 'DE', // TODO

            emailVerified: authResult.emailVerified,
            phoneVerified: authResult.phoneVerified,

            profile: {
              forename: authResult.firstName,
              surname: authResult.lastName,
            },

            address: {
              street: authResult.street,
              houseNumber: authResult.streetNo,
              zipCode: authResult.zipCode,
              country: 'Deutschland', // TODO
            },
          },
        });
        return true;
      }
      dispatch({
        type: AUTHENTICATION_FAILURE,
        data: {
          errors: 'E-Mail Adresse oder Passwort ist nicht korrekt.',
        },
      });
      return false;
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_FAILURE,
      });
      return false;
    }
  };

  /**
   * Makes a request to the backend in order to invalidate (logout) a user, i.e. clearing his cookie and modifies state accordingly
   */
  const invalidateAuthentication = async () => {
    try {
      await firebase.auth().signOut();

      localStorage.removeItem('token');
      dispatch({
        type: INVALIDATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_FAILURE,
      });
    }
  };

  return [
    authenticationState,
    {
      performAuthentication,
      checkAuthentication,
      invalidateAuthentication,
      isAuthenticated,
      isMailVerified,
      isPhoneVerified,
      performRegister,
    },
  ];
}
