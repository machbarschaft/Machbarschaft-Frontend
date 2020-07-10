import React from 'react';
import {Result, Spin, Button, Typography} from 'antd';
import DashboardTile from './dashboardTile';
import DashboardTileHelperStatus from './dashboardTileHelperStatus';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';
import DashboardHelperOldRequests from './dashboardHelperOldRequests';
import useDashboard from '../../hooks/useDashboard';

const {Title} = Typography;

function DashboardHelper() {
  const [requestsState, fetchRequests] = useDashboard("helper");

  return (
    <>
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
      {requestsState.loading == false && requestsState.error == null && requestsState.currentRequests.length == 0 &&
        <Result title="Du hast aktuell keinen Auftrag angenommen" />
      }
      {requestsState.error == null && requestsState.loading == false && requestsState.currentRequests.length == 1 &&
        <>
          <DashboardTileHelperStatus name={requestsState.currentRequests[0].name} status={requestsState.currentRequests[0].status} />
          <div className="dashboard-columns-container">
            <div className="dashboard-column">
              <DashboardTileContact
                name={requestsState.currentRequests[0].name}
                phone={requestsState.currentRequests[0].phone}
                street={requestsState.currentRequests[0].address.street}
                zipCode={requestsState.currentRequests[0].address.zipCode}
                city={requestsState.currentRequests[0].address.city}
              />
              <br />
              <DashboardTileRequestType requestType={requestsState.currentRequests[0].requestType} />
            </div>
            <div className="dashboard-column">
              <DashboardTileUrgency urgency="now" />
              <DashboardTileAdditionalInformation
                carNecessary={requestsState.currentRequests[0].extras.carNecessary}
                prescriptionRequired={requestsState.currentRequests[0].extras.prescriptionRequired}
                timestamp={requestsState.currentRequests[0].startedAt}
              />
            </div>
          </div>
        </>
      }
      {requestsState.loading == false && requestsState.error == null &&
        (requestsState.currentRequests.length > 0 || currentRequests.oldRequests.length > 0) &&
        <DashboardHelperOldRequests requestList={requestsState.oldRequests} />
      }
    </>
  );
}

export default DashboardHelper;
