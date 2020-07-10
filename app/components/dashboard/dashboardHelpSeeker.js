import React from 'react';
import { Typography, Button, Result, Spin } from 'antd';
import DashboardTile from './dashboardTile';
import DashboardTileHelpSeekerStatus from './dashboardTileHelpSeekerStatus';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';
import DashboardHelperOldRequests from './dashboardHelperOldRequests';
import DashboardHelpSeekerOldRequests from './dashboardHelpSeekerOldRequests';
import DashboardHelpSeekerMenu from './dashboardHelpSeekerMenu';
import useDashboard from '../../hooks/useDashboard';

const { Title } = Typography;

function DashboardHelpSeeker() {
  const [requestsState, fetchRequests] = useDashboard("helpSeeker");
  const [menuKey, setMenuKey] = React.useState('request-1');
  const [currentRequestsRenders, setCurrentRequestsRender] = React.useState([]);

  React.useEffect(() => {
    setCurrentRequestsRender(requestsState.currentRequests.map((entry, index) => (
      <div className="dashboard-columns-container">
        <div className="dashboard-column">
          <DashboardTileHelpSeekerStatus
            name={entry.name}
            phone={entry.phone}
            status={entry.status}
          />
          <DashboardTileRequestType requestType={entry.requestType} />
          {entry.status == "open" &&
            <div className="dashboard-cancel-button-container">
              <Button className="dashboard-cancel-button" type="primary">
                AUFTRAG ABBRECHEN
              </Button>
            </div>
          }
        </div>
        <div className="dashboard-column">
          <DashboardTileUrgency urgency={entry.urgency} />
          <DashboardTileAdditionalInformation
            carNecessary={entry.extras.carNecessary}
            prescriptionRequired={entry.extras.prescriptionRequired}
            timestamp={entry.startedAt}
          />
          <DashboardTileContact
            phone={entry.phone}
            street={entry.address.street}
            zipCode={entry.address.zipCode}
            city={entry.address.city}
          />
        </div>
      </div>
    )));
    setMenuKey(requestsState.currentRequests.length > 0 ? 0 : "finished");
  }, [requestsState.currentRequests]);

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
        requestsState.oldRequests.length == 0 &&
        <Result
          title="Du hast noch keinen Auftrag erstellt"
          extra={<>
            Um einen Auftrag zu starten, klicke hier:<br/>
            <Button type="primary" onClick={() => history.push('/place-request')}>Auftrag erstellen</Button>
          </>}
        />
      }
      {requestsState.error == null && requestsState.loading == false &&
        (requestsState.currentRequests.length > 0 || requestsState.oldRequests.length > 0) &&
        <div className="dashboard-helpseeker-container">
          <div className="dashboard-menu-container">
            <div className="dashboard-menu-desktop">
              <DashboardHelpSeekerMenu
                mode="vertical"
                menuKey={menuKey}
                setMenuKey={setMenuKey}
                currentRequests={requestsState.currentRequests}
              />
            </div>
            <div className="dashboard-menu-mobile">
              <DashboardHelpSeekerMenu
                mode="horizontal"
                menuKey={menuKey}
                setMenuKey={setMenuKey}
                currentRequests={requestsState.currentRequests}
              />
            </div>
          </div>
          {requestsState.loading == false && requestsState.error == null &&
            <>
              {menuKey != "finished" ?
                currentRequestsRenders[menuKey]
                :
                <DashboardHelpSeekerOldRequests requestList={requestsState.oldRequests} />
              }
            </>
          }
          <div className="dashboard-tile-spacing" />
        </div>
      }
    </>
  );
}

export default DashboardHelpSeeker;
