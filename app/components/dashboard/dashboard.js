import React from 'react';
import {Result, Spin, Button} from 'antd';
import useDashboard from '../../hooks/useDashboard';
import DashboardHelper from './dashboardHelper';
import DashboardHelpSeeker from './dashboardHelpSeeker';
import AuthenticationContext from '../../contexts/authentication';

function DashboardWindow() {
  const authProps = React.useContext(AuthenticationContext);
  const [requestsState, fetchRequests] = useDashboard("helper");

  /*
		<div className="content-container-default background-light-grey">
			<DashboardHelper/>
		</div>
    <div className="content-container-big background-light-grey">
      <DashboardHelpSeeker />
    </div>
  */

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
      {requestsState.loading == false && requestsState.error == null && requestsState.activeRequests.length == 0 &&
        requestsState.finishedRequests.length == 0 &&
        <Result title="Es gibt noch keinen Auftrag." />
      }
      {requestsState.loading == false && requestsState.error == null &&
        (requestsState.activeRequests.length > 0 || requestsState.finishedRequests.length > 0) &&
        <>
          {requestsState.isHelpSeeker &&
            <DashboardHelpSeeker
              activeRequests={requestsState.activeRequests}
              finishedRequests={requestsState.finishedRequests}
            />
          }
          {!requestsState.isHelpSeeker &&
            <DashboardHelper
              activeRequests={requestsState.activeRequests}
              finishedRequests={requestsState.finishedRequests}
            />
          }
        </>
      }
    </div>
  );
}
export default DashboardWindow;