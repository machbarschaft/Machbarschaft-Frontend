import React from 'react';
import { Result, Spin, Button } from 'antd';
import useDashboard from '../../hooks/useDashboard';
import DashboardHelpRequestList from '../../components/dashboard/dashboardHelpRequestList';

function Requests() {
  const [requestsState, {fetchRequests, updateHelpRequestStatus}] = useDashboard('helper');
  const [localRequestsState, setLocalRequestsState] = React.useState(
    requestsState
  );
  const [loadingEnabled, setLoadingEnabled] = React.useState(true);
  const intervalRef = React.useRef();

  const backgroundFetch = () => {
    setLoadingEnabled(false);
    fetchRequests();
  };
  const foregroundFetch = () => {
    setLoadingEnabled(true);
    fetchRequests();
  };
  React.useEffect(() => {
    if (loadingEnabled || !requestsState.loading)
      setLocalRequestsState(requestsState);
  }, [requestsState]);
  React.useEffect(() => {
    intervalRef.current = setInterval(backgroundFetch, 30000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="content-container-default background-light-grey">
      {localRequestsState.loading && <Result icon={<Spin size="large" />} />}
      {!localRequestsState.loading && localRequestsState.error != null && (
        <Result
          status="warning"
          title="Es ist ein Fehler beim Laden aufgetreten."
          extra={
            <Button type="primary" onClick={() => foregroundFetch()}>
              Erneut versuchen
            </Button>
          }
        />
      )}
      {
        !localRequestsState.loading &&
        localRequestsState.error === null &&
        localRequestsState.helpRequestsResult?.length === 0 && (
          <Result title="Hier gibt es noch keinen Auftrag anzuzeigen." />
        )
      }
      {
        !localRequestsState.loading &&
        localRequestsState.error === null &&
        localRequestsState.helpRequestsResult?.length && (
          <DashboardHelpRequestList updateHelpRequestStatus={updateHelpRequestStatus} helpRequests={localRequestsState.helpRequestsResult} />
        )
      }
    </div>
  );
}
export default Requests;
