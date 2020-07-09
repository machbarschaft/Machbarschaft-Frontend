import React from 'react';
import { Typography, Button } from 'antd';
import DashboardTile from './dashboardTile';
import DashboardTileHelpSeekerStatus from './dashboardTileHelpSeekerStatus';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';
import DashboardHelperOldRequests from './dashboardHelperOldRequests';
import DashboardHelpSeekerOldRequests from './dashboardHelpSeekerOldRequests';
import DashboardHelpSeekerMenu from './dashboardHelpSeekerMenu';

const { Title } = Typography;

function DashboardHelpSeeker() {
  const [menuKey, setMenuKey] = React.useState('request-1');

  return (
    <div className="dashboard-helpseeker-container">
      <div className="dashboard-menu-container">
        <div className="dashboard-menu-desktop">
          <DashboardHelpSeekerMenu
            mode="vertical"
            menuKey={menuKey}
            setMenuKey={setMenuKey}
          />
        </div>
        <div className="dashboard-menu-mobile">
          <DashboardHelpSeekerMenu
            mode="horizontal"
            menuKey={menuKey}
            setMenuKey={setMenuKey}
          />
        </div>
      </div>
      {menuKey == 'request-1' && (
        <div className="dashboard-columns-container">
          <div className="dashboard-column">
            <DashboardTileHelpSeekerStatus
              name="Max Schmidt"
              phone="040/299960980"
              status="accepted"
            />
            <DashboardTileRequestType requestType="groceries" />
            <div className="dashboard-cancel-button-container">
              <Button className="dashboard-cancel-button" type="primary">
                AUFTRAG ABBRECHEN
              </Button>
            </div>
          </div>
          <div className="dashboard-column">
            <DashboardTileUrgency urgency="now" />
            <DashboardTileAdditionalInformation
              carNecessary
              prescriptionRequired={false}
              timestamp={1593672043}
            />
            <DashboardTileContact
              phone="089/8354081"
              street="Höhenstadter Str. 56"
              zipCode={81671}
              city="München"
            />
          </div>
        </div>
      )}
      {menuKey == 'old-requests' && <DashboardHelpSeekerOldRequests />}
      <div className="dashboard-tile-spacing" />
    </div>
  );
}

export default DashboardHelpSeeker;
