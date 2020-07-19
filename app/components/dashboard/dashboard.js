import React from 'react';
import {Result, Spin, Button} from 'antd';
import useDashboard from '../../hooks/useDashboard';
import DashboardHelper from './dashboardHelper';
import DashboardHelpSeeker from './dashboardHelpSeeker';
import AuthenticationContext from '../../contexts/authentication';

function DashboardWindow() {
  const authProps = React.useContext(AuthenticationContext);
  const [requestsState, fetchRequests] = useDashboard("helper");
  const [loadingDisabled, setLoadingDisabled] = React.useState(false);
  const [fgFetchRequested, setFgFetchRequested] = React.useState(false);
  const [bgFetchRequested, setBgFetchRequested] = React.useState(false);
  const intervalRef = React.useRef();

  const backgroundFetch = () => {
    setLoadingDisabled(true);
    setBgFetchRequested(true);
  };
  const foregroundFetch = () => {
    setLoadingDisabled(false);
    setFgFetchRequested(true);
  }
  React.useEffect(() => {
    if(fgFetchRequested && !loadingDisabled) {
      fetchRequests();
      setFgFetchRequested(false);
    }
  }, [loadingDisabled, fgFetchRequested]);
  React.useEffect(() => {
    if(bgFetchRequested && loadingDisabled) {
      fetchRequests();
      setBgFetchRequested(false);
    }
  }, [loadingDisabled, bgFetchRequested]);
  React.useEffect(() => {
    intervalRef.current = setInterval(backgroundFetch, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="content-container-default background-light-grey">
      {requestsState.loading && !loadingDisabled &&
        <Result icon={<Spin size="large" />} />
      }
      {!(requestsState.loading && !loadingDisabled) && requestsState.error != null &&
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
      {!(requestsState.loading && !loadingDisabled) && requestsState.error == null &&
        requestsState.activeRequests.helpSeeker.length == 0 && requestsState.activeRequests.helper.length == 0 &&
        requestsState.finishedRequests.helpSeeker.length == 0 && requestsState.finishedRequests.helper.length == 0 &&
        <Result title="Es gibt noch keinen Auftrag." />
      }
      {!(requestsState.loading && !loadingDisabled) && requestsState.error == null &&
        (requestsState.activeRequests.helpSeeker.length > 0 || requestsState.activeRequests.helper != 0 ||
        requestsState.finishedRequests.helpSeeker.length > 0 || requestsState.finishedRequests.helper.length > 0) &&
        <>
          {requestsState.isHelpSeeker &&
            <DashboardHelpSeeker
              activeRequestsHelpSeeker={requestsState.activeRequests.helpSeeker}
              activeRequestsHelper={requestsState.activeRequests.helper}
              finishedRequestsHelpSeeker={requestsState.finishedRequests.helpSeeker}
              finishedRequestsHelper={requestsState.finishedRequests.helper}
              refreshRequests={() => foregroundFetch()}
              refreshRequestsBackground={() => backgroundFetch()}
            />
          }
          {!requestsState.isHelpSeeker &&
            <DashboardHelper
              activeRequests={requestsState.activeRequests.helper}
              finishedRequests={requestsState.finishedRequests.helper}
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