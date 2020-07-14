import React from 'react';
import {Result, Spin, Button} from 'antd';
import useDashboard from '../../hooks/useDashboard';
import DashboardHelper from './dashboardHelper';
import DashboardHelpSeeker from './dashboardHelpSeeker';
import AuthenticationContext from '../../contexts/authentication';

function DashboardWindow() {
  const authProps = React.useContext(AuthenticationContext);
  const [requestsState, fetchRequests] = useDashboard("helper");

  return (
    <div className="content-container-default background-light-grey">
      {requestsState.loading == true &&
        <Result icon={<Spin size="large" />} />
      }
      {requestsState.loading == false && requestsState.error != null &&
        <Result
          status="warning"
          title="Es ist ein Fehler beim Laden aufgetreten."
          extra={
            <Button type="primary" onClick={() => fetchRequests()}>
              Erneut versuchen
            </Button>
          }
        />
      }
      {requestsState.loading == false && requestsState.error == null &&
        requestsState.activeRequests.helpSeeker.length == 0 && requestsState.activeRequests.helper == null &&
        requestsState.finishedRequests.helpSeeker.length == 0 && requestsState.finishedRequests.helper.length == 0 &&
        <Result title="Es gibt noch keinen Auftrag." />
      }
      {requestsState.loading == false && requestsState.error == null &&
        (requestsState.activeRequests.helpSeeker.length > 0 || requestsState.activeRequests.helper != null ||
        requestsState.finishedRequests.helpSeeker.length > 0 || requestsState.finishedRequests.helper.length > 0) &&
        <>
          {requestsState.isHelpSeeker &&
            <DashboardHelpSeeker
              activeRequestsHelpSeeker={requestsState.activeRequests.helpSeeker}
              activeRequestHelper={requestsState.activeRequests.helper}
              finishedRequestsHelpSeeker={requestsState.finishedRequests.helpSeeker}
              finishedRequestsHelper={requestsState.finishedRequests.helper}
            />
          }
          {!requestsState.isHelpSeeker &&
            <DashboardHelper
              activeRequest={requestsState.activeRequests.helper}
              finishedRequests={requestsState.finishedRequests.helper}
            />
          }
        </>
      }
    </div>
  );
}
export default DashboardWindow;