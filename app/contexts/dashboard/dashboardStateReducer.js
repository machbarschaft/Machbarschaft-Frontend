import {
  ERROR_ACTIVE,
  ERROR_FINISHED,
  ERROR_HELP_REQUEST,
  LOADING_ACTIVE,
  LOADING_FINISHED,
  LOADING_HELP_REQUEST,
  SUCCESS_ACTIVE,
  SUCCESS_FINISHED,
  SUCCESS_HELP_REQUEST,
  SUCCESS_HELP_REQUEST_STATUS,
} from './types';

function isLoading(state) {
  return state.loadingHelpRequests;
}
function isHelper(state) {
  return state.activeRequests.helper != null || state.finishedRequests.helper.length > 0;
}
function isHelpSeeker(state) {
  return state.activeRequests.helpSeeker.length > 0 || state.finishedRequests.helpSeeker.length > 0;
}
function restructureRequests(state) {
  const activeRequests = { helper: [], helpSeeker: [] };
  const finishedRequests = { helper: [], helpSeeker: [] };

  for (let i = 0; i < state.finishedRequestsResult.helper.length; i++) {
    if (state.finishedRequestsResult.helper[i].feedbackSubmitted) {
      finishedRequests.helper.push(state.finishedRequestsResult.helper[i]);
    } else {
      activeRequests.helper.push(state.finishedRequestsResult.helper[i]);
    }
  }
  if (state.activeRequestsResult.helper != null)
    activeRequests.helper.push(state.activeRequestsResult.helper);

  for (let i = 0; i < state.finishedRequestsResult.helpSeeker.length; i++) {
    if (
      state.finishedRequestsResult.helpSeeker[i].feedbackSubmitted ||
      ['done', 'aborted', 'did-not-help'].includes(
        state.finishedRequestsResult.helpSeeker[i].status
      )
    ) {
      finishedRequests.helpSeeker.push(
        state.finishedRequestsResult.helpSeeker[i]
      );
    } else {
      activeRequests.helpSeeker.push(
        state.finishedRequestsResult.helpSeeker[i]
      );
    }
  }
  activeRequests.helpSeeker = activeRequests.helpSeeker.concat(
    state.activeRequestsResult.helpSeeker
  );

  const newState = {
    ...state,
    activeRequests: activeRequests,
    finishedRequests: finishedRequests,
  };
  console.log('new state: ', newState);
  return newState;
}

export default function dashboardStateReducer(state, action) {
  let newState;
  if (action.type === SUCCESS_ACTIVE) {
    newState = {
      ...state,
      loadingActiveRequests: false,
      activeRequestsResult: action.activeRequests,
      isHelper: isHelper(state) || action.activeRequests.helper != null,
      isHelpSeeker:
        isHelpSeeker(state) || action.activeRequests.helpSeeker.length > 0,
    };
    newState.loading = isLoading(newState);
    if (!newState.loading) newState = restructureRequests(newState);
    return newState;
  }
  if (action.type === SUCCESS_FINISHED) {
    newState = {
      ...state,
      loadingFinishedRequests: false,
      finishedRequestsResult: action.finishedRequests,
      isHelper: isHelper(state) || action.finishedRequests.helper.length > 0,
      isHelpSeeker:
        isHelpSeeker(state) || action.finishedRequests.helpSeeker.length > 0,
    };
    newState.loading = isLoading(newState);
    if (!newState.loading) newState = restructureRequests(newState);
    return newState;
  }
  if (action.type === ERROR_ACTIVE) {
    newState = {
      ...state,
      loadingActiveRequests: false,
      error: action.error,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === ERROR_FINISHED) {
    newState = {
      ...state,
      loadingFinishedRequests: false,
      error: action.error,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === LOADING_ACTIVE) {
    return {
      ...state,
      loading: true,
      loadingActiveRequests: true,
      error: null,
    };
  }
  if (action.type === LOADING_FINISHED) {
    return {
      ...state,
      loading: true,
      loadingFinishedRequests: true,
      error: null,
    };
  }
  if (action.type === LOADING_HELP_REQUEST) {
    return {
      ...state,
      loading: true,
      loadingHelpRequests: true,
      error: null,
    };
  }
  if (action.type === SUCCESS_HELP_REQUEST) {
    newState = {
      ...state,
      loadingHelpRequests: false,
      helpRequestsResult: action.helpRequests
    };
    newState.loading = isLoading(newState);

    return newState;
  }
  if (action.type === ERROR_HELP_REQUEST) {
    newState = {
      ...state,
      loadingHelpRequests: false,
      error: action.error,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === SUCCESS_HELP_REQUEST_STATUS) {
    newState = {
      ...state,
      loadingHelpRequests: false,
      helpRequestsResult: state.helpRequestsResult.map(helpRequest => helpRequest.id === action.helpRequest.id ? action.helpRequest : helpRequest)
    };
    newState.loading = isLoading(newState);

    return newState;
  }
  throw new Error('Unsupported');
};
