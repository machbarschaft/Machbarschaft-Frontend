import React from 'react';
import {
  getCurrentRequestHelper,
  getCurrentRequestsHelpSeeker,
  getOldRequestsHelper,
  getOldRequestsHelpSeeker
} from '../utils/api/dashboardAPI';

function dashboardStateReducer(state, action) {
  if (action.type === 'success-current') {
    return {
      ...state,
      loading: state.loadingOldRequests,
      loadingCurrentRequests: false,
      currentRequests: action.currentRequests,
      error: null
    };
  }
  if (action.type === 'success-old') {
    return {
      ...state,
      loading: state.loadingCurrentRequests,
      loadingOldRequests: false,
      oldRequests: action.oldRequests,
      error: null
    };
  }
  if (action.type === 'error-current') {
    return {
      ...state,
      loading: state.loadingOldRequests,
      loadingCurrentRequests: false,
      currentRequests: [],
      error: action.error
    };
  }
  if (action.type === 'error-old') {
    return {
      ...state,
      loading: state.loadingCurrentRequests,
      loadingOldRequests: false,
      oldRequests: [],
      error: action.error
    };
  }
  if (action.type == 'loading-current') {
    return {
      ...state,
      loading: true,
      loadingCurrentRequests: true,
      currentRequests: [],
      error: null
    }
  }
  if (action.type == 'loading-old') {
    return {
      ...state,
      loading: true,
      loadingOldRequests: true,
      oldRequests: [],
      error: null
    }
  }
  throw new Error('Unsupported');
}

export default function useDashboard(type) {
  const [requestsState, dispatchRequestsState] = React.useReducer(
    dashboardStateReducer,
    {
      loading: true,
      loadingCurrentRequests: true,
      loadingOldRequests: true,
      currentRequests: [],
      oldRequests: [],
      error: null,
    }
  );
  console.log("type: " + type);
  const currentRequestsFetch = type == "helper" ? getCurrentRequestHelper : getCurrentRequestsHelpSeeker;
  const oldRequestFetch = type == "helper" ? getOldRequestsHelper : getOldRequestsHelpSeeker;
  const fetchCurrentRequests = () => {
    dispatchRequestsState({type: "loading-current"});
    currentRequestsFetch()
      .then((res) => dispatchRequestsState({type: "success-current", currentRequests: res}))
      .catch((err) => dispatchRequestsState({type: "error-current", error: err}));
  }
  const fetchOldRequests = () => {
    dispatchRequestsState({type: "loading-old"});
    oldRequestFetch()
      .then((res) => dispatchRequestsState({type: "success-old", oldRequests: res}))
      .catch((err) => dispatchRequestsState({type: "error-old", error: err}));
  }
  const fetchRequests = () => {
    fetchCurrentRequests();
    fetchOldRequests();
  }
  React.useEffect(() => fetchRequests(), []);

  return [requestsState, fetchRequests];
}