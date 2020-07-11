import React from 'react';
import {
  getActiveRequests,
  getFinishedRequests
} from '../utils/api/dashboardAPI';

function checkIfHelpSeeker(requests) {
  for(var i = 0; i < requests.length; i++) {
    if(requests[i].isHelpSeeker) return true;
  }
  return false;
}

function dashboardStateReducer(state, action) {
  if (action.type === 'success-active') {
    var isHelpSeeker = checkIfHelpSeeker(action.activeRequests);
    return {
      ...state,
      loading: state.loadingFinishedRequests,
      loadingActiveRequests: false,
      activeRequests: action.activeRequests,
      isHelpSeeker: state.isHelpSeeker || isHelpSeeker,
      error: null
    };
  }
  if (action.type === 'success-finished') {
    var isHelpSeeker = checkIfHelpSeeker(action.finishedRequests);
    return {
      ...state,
      loading: state.loadingActiveRequests,
      loadingFinishedRequests: false,
      finishedRequests: action.finishedRequests,
      isHelpSeeker: state.isHelpSeeker || isHelpSeeker,
      error: null
    };
  }
  if (action.type === 'error-active') {
    return {
      ...state,
      loading: state.loadingFinishedRequests,
      loadingActiveRequests: false,
      activeRequests: [],
      error: action.error
    };
  }
  if (action.type === 'error-finished') {
    return {
      ...state,
      loading: state.loadingActiveRequests,
      loadingFinishedRequests: false,
      finishedRequests: [],
      error: action.error
    };
  }
  if (action.type == 'loading-active') {
    return {
      ...state,
      loading: true,
      loadingActiveRequests: true,
      activeRequests: [],
      isHelpSeeker: false,
      error: null
    }
  }
  if (action.type == 'loading-finished') {
    return {
      ...state,
      loading: true,
      loadingFinishedRequests: true,
      finishedRequests: [],
      isHelpSeeker: false,
      error: null
    }
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
      activeRequests: [],
      finishedRequests: [],
      isHelpSeeker: false,
      error: null,
    }
  );
  const fetchActiveRequests = () => {
    dispatchRequestsState({type: "loading-active"});
    getActiveRequests()
      .then((res) => dispatchRequestsState({type: "success-active", activeRequests: res}))
      .catch((err) => dispatchRequestsState({type: "error-active", error: err}));
  }
  const fetchFinishedRequests = () => {
    dispatchRequestsState({type: "loading-finished"});
    getFinishedRequests()
      .then((res) => dispatchRequestsState({type: "success-finished", finishedRequests: res}))
      .catch((err) => dispatchRequestsState({type: "error-finished", error: err}));
  }
  const fetchRequests = () => {
    fetchActiveRequests();
    fetchFinishedRequests();
  }
  React.useEffect(() => fetchRequests(), []);

  return [requestsState, fetchRequests];
}