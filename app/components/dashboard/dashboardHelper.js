import React from 'react';
import PropTypes from 'prop-types';
import {Result, Typography} from 'antd';
import DashboardHelperActiveRequest from './dashboardHelperActiveRequest';
import DashboardHelperFinishedRequests from './dashboardHelperFinishedRequests';

const {Title} = Typography;

function DashboardHelper({activeRequest, finishedRequests}) {
  return (
    <>
      {activeRequests.length == 0 &&
        <Result title="Sie haben aktuell keinen Auftrag angenommen." />
      }
      {activeRequests != null &&
        <DashboardHelperActiveRequest
          name={activeRequests[0].name}
          phone={activeRequests[0].phone}
          status={activeRequests[0].status}
          requestType={activeRequests[0].requestType}
          urgency={activeRequests[0].urgency}
          carNecessary={activeRequests[0].extras.carNecessary}
          prescriptionRequired={activeRequests[0].extras.prescriptionRequired}
          address={activeRequests[0].address}
        />
      }
      <DashboardHelperFinishedRequests requestList={finishedRequests} />
    </>
  );
}
DashboardHelper.propTypes = {
  activeRequest: PropTypes.object.isRequired,
  finishedRequests: PropTypes.array.isRequired
}
export default DashboardHelper;