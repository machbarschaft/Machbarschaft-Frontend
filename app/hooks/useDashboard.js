import React from 'react';
import {
  getActiveRequests,
  getFinishedRequests,
} from '../utils/api/dashboardApi';

function isLoading(state) {
  if (state.loadingActiveRequests) return true;
  if (state.loadingFinishedRequests) return true;
  return false;
}
function isHelper(state) {
  if (state.activeRequests.helper != null) return true;
  if (state.finishedRequests.helper.length > 0) return true;
  return false;
}
function isHelpSeeker(state) {
  if (state.activeRequests.helpSeeker.length > 0) return true;
  if (state.finishedRequests.helpSeeker.length > 0) return true;
  return false;
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

function dashboardStateReducer(state, action) {
  let newState;
  if (action.type === 'success-active') {
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
  if (action.type === 'success-finished') {
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
  if (action.type === 'error-active') {
    newState = {
      ...state,
      loadingActiveRequests: false,
      error: action.error,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'error-finished') {
    newState = {
      ...state,
      loadingFinishedRequests: false,
      error: action.error,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'loading-active') {
    return {
      ...state,
      loading: true,
      loadingActiveRequests: true,
      error: null,
    };
  }
  if (action.type === 'loading-finished') {
    return {
      ...state,
      loading: true,
      loadingFinishedRequests: true,
      error: null,
    };
  }
  throw new Error('Unsupported');
}

export default function useDashboard() {
  const [requestsState, dispatchRequestsState] = React.useReducer(
    dashboardStateReducer,
    {
      loading: true,
      loadingActiveRequests: true,
      loadingFinishedRequests: true,
      activeRequests: { helper: [], helpSeeker: [] },
      finishedRequests: { helper: [], helpSeeker: [] },
      activeRequestsResult: { helper: null, helpSeeker: [] },
      finishedRequestsResult: { helper: [], helpSeeker: [] },
      isHelper: false,
      isHelpSeeker: false,
      error: null,
    }
  );
  const fetchActiveRequests = () => {
    dispatchRequestsState({ type: 'loading-active' });
    getActiveRequests()
      .then((res) => {
        dispatchRequestsState({ type: 'success-active', activeRequests: res });
      })
      .catch((err) =>
        dispatchRequestsState({ type: 'error-active', error: err })
      );
  };
  const fetchFinishedRequests = () => {
    dispatchRequestsState({ type: 'loading-finished' });
    getFinishedRequests()
      .then((res) =>
        dispatchRequestsState({
          type: 'success-finished',
          finishedRequests: res,
        })
      )
      .catch((err) =>
        dispatchRequestsState({ type: 'error-finished', error: err })
      );
  };
  const fetchRequests = () => {
    fetchActiveRequests();
    fetchFinishedRequests();
  };
  React.useEffect(() => fetchRequests(), []);

  return [requestsState, fetchRequests];
}
