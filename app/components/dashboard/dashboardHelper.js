import React from 'react';
import PropTypes from 'prop-types';
import {Result, Typography} from 'antd';
import DashboardHelperActiveRequest from './dashboardHelperActiveRequest';
import DashboardHelperFinishedRequests from './dashboardHelperFinishedRequests';
import DashboardFeedBackHelper from './dashboardFeedBackHelper';

const {Title} = Typography;

function DashboardHelper({
  activeRequest,
  finishedRequests,
  needFeedBackHelper,
  refreshRequests,
  refreshRequestsBackground
}) {
  return (
    <>
      {needFeedBackHelper &&
        <DashboardFeedBackHelper
          processId={activeRequest.process}
          name={activeRequest.name}
          feedBackSent={() => refreshRequests()}
        />
      }
      {activeRequest == null &&
        <Result title="Sie haben aktuell keinen Auftrag angenommen." />
      }
      {activeRequest != null &&
        <DashboardHelperActiveRequest
          name={activeRequest.name}
          phoneHelpSeeker={123456789}
          status={activeRequest.status}
          requestType={activeRequest.requestType}
          urgency={activeRequest.urgency}
          carNecessary={activeRequest.extras.carNecessary}
          prescriptionRequired={activeRequest.extras.prescriptionRequired}
          address={activeRequest.address}
          startedAt={activeRequest.startedAt}
          processId={activeRequest.process}
          refreshRequests={() => {
            console.log("HERE");
            refreshRequestsBackground()}}
        />
      }
      <DashboardHelperFinishedRequests title={"Alte Aufträge"} requestList={finishedRequests} />
    </>
  );
}
DashboardHelper.propTypes = {
  activeRequest: PropTypes.object.isRequired,
  finishedRequests: PropTypes.array.isRequired,
  needFeedBackHelper: PropTypes.bool.isRequired,
  refreshRequests: PropTypes.func.isRequired,
  refreshRequestsBackground: PropTypes.func.isRequired
}
export default DashboardHelper;