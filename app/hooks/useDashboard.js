import React from 'react';
import {
  getActiveRequests,
  getFinishedRequests
} from '../utils/api/dashboardAPI';
import { getFeedbackNeeded } from '../utils/api/feedbackAPI';

function checkFeedbackHelpSeekerLoadingRequired(activeRequests) {
  var result = [];
  for(var i = 0; i < activeRequests.length; i++) {
    result.push(true);
  }
  return result;
}
function isLoading(state) {
  if(state.loadingActiveRequests) return true;
  if(state.loadingFinishedRequests) return true;
  if(state.loadingFeedbackHelper) return true;
  for(var i = 0; i < state.loadingFeedBackHelpSeeker.length; i++) {
    if(state.loadingFeedBackHelpSeeker[i]) return true;
  }
  return false;
}
function getIndex(activeRequests, process) {
  for(var i = 0; i < activeRequests.length; i++) {
    if(activeRequests[i].process == process) return i;
  }
  return -1;
}
function loadFeedbackHelper(processId, dispatchRequestsState) {
  getFeedbackNeeded(processId)
      .then((res) => dispatchRequestsState({
        type: "success-feedback-helper",
        needFeedBackHelper: res.needFeedback
      }))
      .catch((err) => dispatchRequestsState({type: "error-feedback-helper", error: err}));
}
function loadFeedbackHelpSeeker(activeRequests, dispatchRequestsState) {
  for(var i = 0; i < activeRequests.length; i++) {
    getFeedbackNeeded(activeRequests[i].process)
      .then((res) => dispatchRequestsState({
        type: "success-feedback-helpseeker",
        index: getIndex(activeRequests, res.process),
        needFeedBackHelpSeeker: res.needFeedback
      }))
      .catch((err) => dispatchRequestsState({type: "error-feedback-helpseeker", index: i, error: err}));
  }
}
function isHelper(state) {
  if(state.activeRequests.helper != null) return true;
  if(state.finishedRequests.helper.length > 0) return true;
  return false;
}
function isHelpSeeker(state) {
  if(state.activeRequests.helpSeeker.length > 0) return true;
  if(state.finishedRequests.helpSeeker.length > 0) return true;
  return false;
}

function dashboardStateReducer(state, action) {
  if (action.type === 'success-active') {
    var newState = {
      ...state,
      loadingActiveRequests: false,
      loadingFeedbackHelper: action.activeRequests.helper != null,
      loadingFeedBackHelpSeeker: checkFeedbackHelpSeekerLoadingRequired(action.activeRequests.helpSeeker),
      activeRequests: action.activeRequests,
      isHelper: isHelper(state) || action.activeRequests.helper != null,
      isHelpSeeker: isHelpSeeker(state) || action.activeRequests.helpSeeker.length > 0,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'success-finished') {
    var newState = {
      ...state,
      loadingFinishedRequests: false,
      finishedRequests: action.finishedRequests,
      isHelper: isHelper(state) || action.finishedRequests.helper.length > 0,
      isHelpSeeker: isHelpSeeker(state) || action.finishedRequests.helpSeeker.length > 0,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'success-feedback-helper') {
    var newState = {
      ...state,
      loadingFeedbackHelper: false,
      needFeedBackHelper: action.needFeedBackHelper,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'success-feedback-helpseeker') {
    var newLoadingState = state.loadingFeedBackHelpSeeker;
    newLoadingState[action.index] = false;
    var newFeedBackState = state.needFeedBackHelpSeeker;
    newFeedBackState[action.index] = action.needFeedBackHelpSeeker;
    var newState = {
      ...state,
      loadingFeedBackHelpSeeker: newLoadingState,
      needFeedBackHelpSeeker: newFeedBackState,
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'error-active') {
    var newState = {
      ...state,
      loadingActiveRequests: false,
      error: action.error
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'error-feedback-helper') {
    var newState = {
      ...state,
      loadingFeedbackHelper: false,
      needFeedBackHelper: false,
      error: action.error
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'error-feedback-helpseeker') {
    var newLoadingState = state.loadingFeedBackHelpSeeker;
    newLoadingState[action.index] = false;
    var newFeedBackState = state.needFeedBackHelpSeeker;
    newFeedBackState[action.index] = false;
    var newState = {
      ...state,
      loadingFeedBackHelpSeeker: newLoadingState,
      needFeedBackHelpSeeker: newFeedBackState,
      error: action.error
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type === 'error-finished') {
    var newState = {
      ...state,
      loadingFinishedRequests: false,
      error: action.error
    };
    newState.loading = isLoading(newState);
    return newState;
  }
  if (action.type == 'loading-active') {
    return {
      ...state,
      loading: true,
      loadingActiveRequests: true,
      error: null
    }
  }
  if (action.type == 'loading-finished') {
    return {
      ...state,
      loading: true,
      loadingFinishedRequests: true,
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
      loadingFeedbackHelper: false,
      loadingFeedBackHelpSeeker: [],
      loadingFinishedRequests: true,
      activeRequests: {helper: null, helpSeeker: []},
      needFeedBackHelper: false,
      needFeedBackHelpSeeker: [],
      finishedRequests: {helper: [], helpSeeker: []},
      isHelper: false,
      isHelpSeeker: false,
      error: null,
    }
  );
  const fetchActiveRequests = () => {
    dispatchRequestsState({type: "loading-active"});
    getActiveRequests()
      .then((res) => {
        dispatchRequestsState({type: "success-active", activeRequests: res});
        if(res.helper != null) {
          loadFeedbackHelper(res.helper.process, dispatchRequestsState);
        }
        loadFeedbackHelpSeeker(res.helpSeeker, dispatchRequestsState);
      })
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