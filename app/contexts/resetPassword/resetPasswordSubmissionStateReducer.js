import { INVALID_TOKEN, OFFLINE, SUBMIT, SUCCESS, ERROR } from './types';

export default function resetPasswordSubmissionStateReducer(state, action) {
  if (action.type === SUCCESS) {
    return {
      ...state,
      error: null,
      loading: false,
    };
  }
  if (action.type === ERROR) {
    return {
      ...state,
      error: 'Überprüfen Sie Ihre E-Mail-Adresse',
      loading: false,
    };
  }
  if (action.type === SUBMIT) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }
  if (action.type === OFFLINE) {
    return {
      ...state,
      error:
        'Es konnte keine Verbindung hergestellt werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
      loading: false,
    };
  }
  if (action.type === INVALID_TOKEN) {
    return {
      ...state,
      error:
        'Die Sitzung oder der Link ist abgelaufen. Bitte versuchen Sie erneut, Ihr Password zurückzusetzten.',
    };
  }
  throw new Error('Unsupported');
}
