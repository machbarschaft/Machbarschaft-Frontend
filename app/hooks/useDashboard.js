import React from 'react';
import {
  getActiveRequests,
  getFinishedRequests,
} from '../utils/api/dashboardApi';
import dashboardStateReducer from '../contexts/dashboard/dashboardStateReducer';
import {
  ERROR_ACTIVE,
  ERROR_FINISHED,
  LOADING_ACTIVE,
  LOADING_FINISHED,
  SUCCESS_ACTIVE,
  SUCCESS_FINISHED,
} from '../contexts/dashboard/types';

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
    dispatchRequestsState({ type: LOADING_ACTIVE });
    getActiveRequests()
      .then((res) => {
        dispatchRequestsState({ type: SUCCESS_ACTIVE, activeRequests: res });
      })
      .catch((err) =>
        dispatchRequestsState({ type: ERROR_ACTIVE, error: err })
      );
  };
  const fetchFinishedRequests = () => {
    dispatchRequestsState({ type: LOADING_FINISHED });
    getFinishedRequests()
      .then((res) =>
        dispatchRequestsState({
          type: SUCCESS_FINISHED,
          finishedRequests: res,
        })
      )
      .catch((err) =>
        dispatchRequestsState({ type: ERROR_FINISHED, error: err })
      );
  };
  const fetchRequests = () => {
    fetchActiveRequests();
    fetchFinishedRequests();
  };
  React.useEffect(() => fetchRequests(), []);

  return [requestsState, fetchRequests];
}
