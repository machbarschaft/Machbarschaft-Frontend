import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Result, Spin } from 'antd';
import DashboardTileHelpSeekerStatus from './dashboardTileHelpSeekerStatus';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';
import DashboardHelpSeekerFinishedRequests from './dashboardHelpSeekerFinishedRequests';
import DashboardHelpSeekerMenu from './dashboardHelpSeekerMenu';

const { Title } = Typography;

function DashboardHelpSeeker({activeRequests, finishedRequests}) {
  const [menuKey, setMenuKey] = React.useState('request-1');
  const [activeRequestsRenders, setActiveRequestsRender] = React.useState([]);

  React.useEffect(() => {
    setActiveRequestsRender(activeRequests.map((entry, index) => (
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
    setMenuKey(activeRequests.length > 0 ? 0 : "finished");
  }, [activeRequests]);

  return (
    <>
      <div className="dashboard-helpseeker-container">
        <div className="dashboard-menu-container">
          <div className="dashboard-menu-desktop">
            <DashboardHelpSeekerMenu
              mode="vertical"
              menuKey={menuKey}
              setMenuKey={setMenuKey}
              activeRequests={activeRequests}
            />
          </div>
          <div className="dashboard-menu-mobile">
            <DashboardHelpSeekerMenu
              mode="horizontal"
              menuKey={menuKey}
              setMenuKey={setMenuKey}
              activeRequests={activeRequests}
            />
          </div>
        </div>
        {menuKey != "finished" ?
          activeRequestsRenders[menuKey]
          :
          <DashboardHelpSeekerFinishedRequests requestList={finishedRequests} />
        }
        <div className="dashboard-tile-spacing" />
      </div>
    </>
  );
}
DashboardHelpSeeker.propTypes = {
  activeRequests: PropTypes.array.isRequired,
  finishedRequests: PropTypes.array.isRequired
}
export default DashboardHelpSeeker;