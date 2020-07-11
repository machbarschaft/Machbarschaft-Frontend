import React from 'react';
import PropTypes from 'prop-types';
import {Result, Typography} from 'antd';
import DashboardTileHelperStatus from './dashboardTileHelperStatus';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';
import DashboardHelperFinishedRequests from './dashboardHelperFinishedRequests';

const {Title} = Typography;

function DashboardHelper({activeRequests, finishedRequests}) {
  return (
    <>
      {activeRequests.length == 0 &&
        <Result title="Sie haben aktuell keinen Auftrag angenommen." />
      }
      {activeRequests.length == 1 &&
        <>
          <DashboardTileHelperStatus name={activeRequests[0].name} status={activeRequests[0].status} />
          <div className="dashboard-columns-container">
            <div className="dashboard-column">
              <DashboardTileContact
                name={activeRequests[0].name}
                phone={activeRequests[0].phone}
                street={activeRequests[0].address.street}
                zipCode={activeRequests[0].address.zipCode}
                city={activeRequests[0].address.city}
              />
              <br />
              <DashboardTileRequestType requestType={activeRequests[0].requestType} />
            </div>
            <div className="dashboard-column">
              <DashboardTileUrgency urgency="now" />
              <DashboardTileAdditionalInformation
                carNecessary={activeRequests[0].extras.carNecessary}
                prescriptionRequired={activeRequests[0].extras.prescriptionRequired}
                timestamp={activeRequests[0].startedAt}
              />
            </div>
          </div>
        </>
      }
      <DashboardHelperFinishedRequests requestList={finishedRequests} />
    </>
  );
}
DashboardHelper.propTypes = {
  activeRequests: PropTypes.array.isRequired,
  finishedRequests: PropTypes.array.isRequired
}
export default DashboardHelper;