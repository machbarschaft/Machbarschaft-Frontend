import {
  ERROR_FEEDBACK,
  ERROR_REOPEN_REQUEST,
  LOADING_FEEDBACK,
  LOADING_REOPEN_REQUEST,
  SUCCESS_FEEDBACK,
  SUCCESS_REOPEN_REQUEST,
} from './types';

export default function sendStateReducer(state, action) {
  if (action.type === SUCCESS_FEEDBACK) {
    return {
      ...state,
      loading: state.loadingReopenRequest,
      loadingFeedback: false,
      sendingFinished: !state.loadingReopenRequest,
    };
  }
  if (action.type === SUCCESS_REOPEN_REQUEST) {
    return {
      ...state,
      loading: state.loadingFeedback,
      loadingReopenRequest: false,
      sendingFinished: !state.loadingFeedback,
    };
  }
  if (action.type === ERROR_FEEDBACK) {
    console.log('error: ', action.error);
    return {
      ...state,
      loading: state.loadingReopenRequest,
      loadingFeedback: false,
      error: action.error,
    };
  }
  if (action.type === ERROR_REOPEN_REQUEST) {
    console.log('error: ', action.error);
    return {
      ...state,
      loading: state.loadingFeedback,
      loadingReopenRequest: false,
      error: action.error,
    };
  }
  if (action.type === LOADING_FEEDBACK) {
    return {
      ...state,
      loading: true,
      loadingFeedback: true,
      error: null,
    };
  }
  if (action.type === LOADING_REOPEN_REQUEST) {
    return {
      ...state,
      loading: true,
      loadingReopenRequest: true,
      error: null,
    };
  }
  throw new Error('Unsupported');
}
