import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_SUCCESS,
  INVALIDATE_FAILURE,
  INVALIDATE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_INIT,
  REGISTER_FAILURE,
  REGISTER_INIT,
  REGISTER_SUCCESS,
} from './types';

export const initialAuthenticationState = {
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

export default function authenticationReducer(state, action) {
  switch (action.type) {
    case LOGIN_INIT:
      return {
        ...initialAuthenticationState,
        isAuthenticating: true,
        isInitialLoading: false,
      };
    case REGISTER_INIT:
      return {
        ...initialAuthenticationState,
        isInitialLoading: false,
        isRegistering: true,
      };
    case LOGIN_FAILURE:
      return {
        ...initialAuthenticationState,
        isAuthenticating: false,
        isInitialLoading: false,
        authenticationErrors: action.data.errors,
      };
    case REGISTER_FAILURE:
      return {
        ...initialAuthenticationState,
        isInitialLoading: false,
        isRegistering: false,
        registerErrors: action.data.errors,
      };
    case AUTHENTICATION_SUCCESS:
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
    case REGISTER_SUCCESS:
      return {
        ...state,

        isAuthenticating: false,
        isInitialLoading: false,
      };
    case AUTHENTICATION_FAILURE:
      return {
        ...initialAuthenticationState,
        isAuthenticating: false,
        isInitialLoading: false,
      };
    case INVALIDATE_SUCCESS:
      return {
        ...initialAuthenticationState,
        isInitialLoading: false,
      };
    case INVALIDATE_FAILURE:
      return {
        ...initialAuthenticationState,
        isInitialLoading: false,
        authenticationErrors: action.data.errors,
      };
    default:
      throw new Error('Unsupported Type');
  }
}
