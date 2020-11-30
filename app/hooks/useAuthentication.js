import React from 'react';
import {
  getAuthenticate,
  putLogin,
  putLogout,
} from '../utils/api/authenticationApi';
import postRegisterRequest from '../utils/api/registerApi';

const initialAuthenticationState = {
  // User Data
  uid: null,
  email: null,
  phoneNumber: null,
  countryCode: null,

  // Verification
  emailVerified: false,
  phoneVerified: false,

  // Profile
  profile: {
    forename: '',
    surname: '',
  },

  // Adresse
  address: {
    street: '',
    houseNumber: '',
    zipCode: '',
    country: '',
  },

  // Process Information
  isInitialLoading: true,
  isAuthenticating: false,
  isRegistering: false,
  authenticationErrors: null,
  registerErrors: null,
};

function authenticationReducer(state, action) {
  switch (action.type) {
    case 'loginInit':
      return {
        ...initialAuthenticationState,
        isAuthenticating: true,
        isInitialLoading: false,
      };
    case 'registerInit':
      return {
        ...initialAuthenticationState,
        isInitialLoading: false,
        isRegistering: true,
      };
    case 'loginFailure':
      return {
        ...initialAuthenticationState,
        isAuthenticating: false,
        isInitialLoading: false,
        authenticationErrors: action.data.errors,
      };
    case 'registerFailure':
      return {
        ...initialAuthenticationState,
        isInitialLoading: false,
        isRegistering: false,
        registerErrors: action.data.errors,
      };
    case 'authenticationSuccess':
      return {
        ...state,

        isAuthenticating: false,
        isInitialLoading: false,

        emailVerified: action.data.emailVerified,
        phoneVerified: action.data.phoneVerified,

        uid: action.data.uid,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber,
        countryCode: action.data.countryCode,

        profile: action.data.profile,
        address: action.data.address,
      };
    case 'registerSuccess':
      return {
        ...state,

        isAuthenticating: false,
        isInitialLoading: false,
      };
    case 'authenticationFailure':
      return {
        ...initialAuthenticationState,
        isAuthenticating: false,
        isInitialLoading: false,
      };
    case 'invalidateSuccess':
      return {
        ...initialAuthenticationState,
        isInitialLoading: false,
      };
    default:
      throw new Error('Unsupported Type');
  }
}

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
      type: 'registerInit',
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
            registerResult = await registerResult.json();
            dispatch({
              type: 'registerFailure',
              data: {
                errors: [
                  'Das Passwort muss mindestens fünf Zeichen lang sein.',
                ],
              },
            });
            return false;
          case 400:
            // User exists
            registerResult = await registerResult.json();
            dispatch({
              type: 'registerFailure',
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
              type: 'registerFailure',
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
              type: 'registerFailure',
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
        type: 'registerFailure',
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
      type: 'loginInit',
    });

    try {
      const loginResult = await putLogin(email, password);
      if (loginResult.user.email === email) {
        return await checkAuthentication();
      }
      dispatch({
        type: 'loginFailure',
        data: {
          errors: ['Zu dieser Kombination konnten wir keinen Benutzer finden.'],
        },
      });
      return false;
    } catch (error) {
      dispatch({
        type: 'loginFailure',
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
      if (authResult.status === 200) {
        const authenticateResult = await authResult.json();
        dispatch({
          type: 'authenticationSuccess',
          data: {
            uid: authenticateResult.uid,
            email: authenticateResult.email,
            phoneNumber: authenticateResult.phone,
            countryCode: authenticateResult.countryCode,

            emailVerified: authenticateResult.emailVerified,
            phoneVerified: authenticateResult.phoneVerified,

            profile: {
              forename: authenticateResult.profile
                ? authenticateResult.profile.forename
                : null,
              surname: authenticateResult.profile
                ? authenticateResult.profile.surname
                : null,
            },

            address: {
              street: authenticateResult.address
                ? authenticateResult.address.street
                : null,
              houseNumber: authenticateResult.address
                ? authenticateResult.address.houseNumber
                : null,
              zipCode: authenticateResult.address
                ? authenticateResult.address.zipCode
                : null,
              country: authenticateResult.address
                ? authenticateResult.address.country
                : null,
            },
          },
        });
        return true;
      }
      dispatch({
        type: 'authenticationFailure',
        data: {
          errors: 'E-Mail Adresse oder Passwort ist nicht korrekt.',
        },
      });
      return false;
    } catch (error) {
      dispatch({
        type: 'authenticationFailure',
      });
      return false;
    }
  };

  /**
   * Makes a request to the backend in order to invalidate (logout) a user, i.e. clearing his cookie and modifies state accordingly
   */
  const invalidateAuthentication = async () => {
    try {
      const logoutResult = await putLogout();
      if (logoutResult.status === 200) {
        dispatch({
          type: 'invalidateSuccess',
        });
      } else {
        dispatch({
          type: 'invalidateFailure',
        });
      }
    } catch (error) {
      dispatch({
        type: 'authenticationFailure',
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
