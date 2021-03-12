import React from 'react';
import { getHelpRequests } from '../utils/api/dashboardApi';
import dashboardStateReducer from '../contexts/dashboard/dashboardStateReducer';
import {
  ERROR_HELP_REQUEST,
  LOADING_HELP_REQUEST,
  SUCCESS_HELP_REQUEST,
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
  const fetchHelpRequests = () => {
    dispatchRequestsState({ type: LOADING_HELP_REQUEST });
    getHelpRequests()
      .then((res) => {
        dispatchRequestsState({ type: SUCCESS_HELP_REQUEST, helpRequests: res });
      })
      .catch((err) =>
        dispatchRequestsState({ type: ERROR_HELP_REQUEST, error: err })
      );
  };
  const fetchRequests = () => {
    fetchHelpRequests();
  };
  React.useEffect(() => fetchRequests(), []);

  return [requestsState, fetchRequests];
}
