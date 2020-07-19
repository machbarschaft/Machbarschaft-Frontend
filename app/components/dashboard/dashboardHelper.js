import React from 'react';
import PropTypes from 'prop-types';
import { Result, Typography } from 'antd';

const DashboardHelperActiveRequest = React.lazy(() =>
  import('./dashboardHelperActiveRequest')
);
const DashboardHelperFinishedRequests = React.lazy(() =>
  import('./dashboardHelperFinishedRequests')
);
const DashboardFeedBackHelper = React.lazy(() =>
  import('./dashboardFeedBackHelper')
);

const { Title } = Typography;

function DashboardHelper({
  activeRequests,
  finishedRequests,
  refreshRequests,
  refreshRequestsBackground,
}) {
  const [activeRequestsRender, setActiveRequestsRender] = React.useState([]);
  React.useEffect(() => {
    setActiveRequestsRender(
      activeRequests.map((entry, index) => (
        <React.Fragment key={index}>
          {!entry.feedbackSubmitted &&
            ['done', 'aborted', 'did-not-help'].includes(entry.status) && (
              <DashboardFeedBackHelper
                _id={entry._id}
                name={entry.name}
                feedBackSent={() => refreshRequests()}
              />
            )}
          <DashboardHelperActiveRequest
            name={entry.name}
            phoneHelpSeeker={40299960804}
            status={entry.status}
            requestType={entry.requestType}
            urgency={entry.urgency}
            carNecessary={entry.extras.carNecessary}
            prescriptionRequired={entry.extras.prescriptionRequired}
            address={entry.address}
            startedAt={entry.startedAt}
            processId={entry.process}
            refreshRequests={() => refreshRequestsBackground()}
          />
        </React.Fragment>
      ))
    );
  }, [activeRequests]);
  return (
    <>
      {activeRequests.length > 0 && activeRequestsRender}
      {activeRequests.length == 0 && (
        <Result title="Du hast aktuell keinen Auftrag angenommen." />
      )}
      <DashboardHelperFinishedRequests
        title={'Alte Aufträge'}
        requestList={finishedRequests}
      />
    </>
  );
}
DashboardHelper.propTypes = {
  activeRequests: PropTypes.array.isRequired,
  finishedRequests: PropTypes.array.isRequired,
  refreshRequests: PropTypes.func.isRequired,
  refreshRequestsBackground: PropTypes.func.isRequired,
};
export default DashboardHelper;
