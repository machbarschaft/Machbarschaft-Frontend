import React from 'react';
import {Result, Spin, Button} from 'antd';
import useDashboard from '../../hooks/useDashboard';
import DashboardHelper from './dashboardHelper';
import DashboardHelpSeeker from './dashboardHelpSeeker';
import AuthenticationContext from '../../contexts/authentication';

function DashboardWindow() {
  const authProps = React.useContext(AuthenticationContext);
  const [requestsState, fetchRequests] = useDashboard("helper");
  const [localRequestsState, setLocalRequestsState] = React.useState(requestsState);
  const [loadingEnabled, setLoadingEnabled] = React.useState(true);
  const intervalRef = React.useRef();

  const backgroundFetch = () => {
    setLoadingEnabled(false);
    fetchRequests();
  };
  const foregroundFetch = () => {
    setLoadingEnabled(true);
    fetchRequests();
  }
  React.useEffect(() => {
    if(loadingEnabled || !requestsState.loading) setLocalRequestsState(requestsState);
  }, [requestsState]);
  React.useEffect(() => {
    intervalRef.current = setInterval(backgroundFetch, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="content-container-default background-light-grey">
      {localRequestsState.loading &&
        <Result icon={<Spin size="large" />} />
      }
      {!localRequestsState.loading && localRequestsState.error != null &&
        <Result
          status="warning"
          title="Es ist ein Fehler beim Laden aufgetreten."
          extra={
            <Button type="primary" onClick={() => foregroundFetch()}>
              Erneut versuchen
            </Button>
          }
        />
      }
      {!localRequestsState.loading && localRequestsState.error == null &&
        localRequestsState.activeRequests.helpSeeker.length == 0 && localRequestsState.activeRequests.helper.length == 0 &&
        localRequestsState.finishedRequests.helpSeeker.length == 0 && localRequestsState.finishedRequests.helper.length == 0 &&
        <Result title="Hier gibt es noch keinen Auftrag anzuzeigen." />
      }
      {!localRequestsState.loading && localRequestsState.error == null &&
        (localRequestsState.activeRequests.helpSeeker.length > 0 || localRequestsState.activeRequests.helper.length != null ||
        localRequestsState.finishedRequests.helpSeeker.length > 0 || localRequestsState.finishedRequests.helper.length > 0) &&
        <>
          {localRequestsState.isHelpSeeker &&
            <DashboardHelpSeeker
              activeRequestsHelpSeeker={localRequestsState.activeRequests.helpSeeker}
              activeRequestsHelper={localRequestsState.activeRequests.helper}
              finishedRequestsHelpSeeker={localRequestsState.finishedRequests.helpSeeker}
              finishedRequestsHelper={localRequestsState.finishedRequests.helper}
              refreshRequests={() => foregroundFetch()}
              refreshRequestsBackground={() => backgroundFetch()}
            />
          }
          {!localRequestsState.isHelpSeeker &&
            <DashboardHelper
              activeRequests={localRequestsState.activeRequests.helper}
              finishedRequests={localRequestsState.finishedRequests.helper}
              refreshRequests={() => foregroundFetch()}
              refreshRequestsBackground={() => backgroundFetch()}
            />
          }
        </>
      }
    </div>
  );
}
export default DashboardWindow;