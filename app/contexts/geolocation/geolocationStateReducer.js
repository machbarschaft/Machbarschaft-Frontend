import { ERROR, START, SUCCESS } from './types';

export default function geolocationStateReducer(state, action) {
  if (action.type === START) {
    return {
      ...state,
      running: true,
      success: false,
      error: null,
      used: true,
      location: null,
    };
  }
  if (action.type === SUCCESS) {
    return {
      ...state,
      running: false,
      success: true,
      error: null,
      location: action.location,
    };
  }
  if (action.type === ERROR) {
    return {
      ...state,
      running: false,
      success: false,
      error: action.error,
      location: null,
    };
  }
  throw new Error('Unsupported');
};
