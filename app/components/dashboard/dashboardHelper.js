import React from 'react';
import { Typography } from 'antd';
import DashboardTile from './dashboardTile';
import DashboardTileHelperStatus from './dashboardTileHelperStatus';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';
import DashboardHelperOldRequests from './dashboardHelperOldRequests';

const { Title } = Typography;

function DashboardHelper() {
  return (
    <>
      <DashboardTileHelperStatus name="Max Schmidt" status="accepted" />
      <div className="dashboard-columns-container">
        <div className="dashboard-column">
          <DashboardTileContact
            name="Max Schmidt"
            phone="040299960980"
            street="Höhenstadter Str."
            zipCode={81671}
            city="München"
          />
          <br />
          <DashboardTileRequestType requestType="groceries" />
        </div>
        <div className="dashboard-column">
          <DashboardTileUrgency urgency="now" />
          <DashboardTileAdditionalInformation carNecessary prescriptionRequired={false} timestamp={1593672043} />
        </div>
      </div>
      <DashboardHelperOldRequests />
    </>
  );
}

export default DashboardHelper;
