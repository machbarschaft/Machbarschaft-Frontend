import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Result, Collapse } from 'antd';
import DashboardFinishedRequestHeader from './dashboardFinishedRequestHeader';
import DashboardHelperFinishedRequestContent from './dashboardHelperFinishedRequestContent';

const { Title } = Typography;
const { Panel } = Collapse;

function DashboardHelperFinishedRequests({requestList}) {
  const panelRender = requestList.map((entry, index) => (
    <Panel
      header={
        <DashboardFinishedRequestHeader
          finishedAt={entry.finishedAt}
          requestType={entry.requestType}
        />
      }
      key={index}
    >
      <DashboardHelperFinishedRequestContent
        startedAt={entry.startedAt}
        finishedAt={entry.finishedAt}
        name={entry.name}
        requestType={entry.requestType}
        urgency={entry.urgency}
        carNecessary={entry.extras.carNecessary}
        prescriptionRequired={entry.extras.prescriptionRequired}
      />
    </Panel>
  ));

  return (
    <>
      <Title level={2} style={{ marginTop: '1em' }}>
        Alte Aufträge
      </Title>
      {requestList.length == 0 ? (
        <Result title="Es gibt keine alten Aufträge" />
      ) : (
        <Collapse
          className="dashboard-collapse"
          expandIcon={({ isActive }) =>
            isActive ? (
              <span className="dashboard-collapse-button dashboard-collapse-button-selected">
                Weniger anzeigen
              </span>
            ) : (
              <span className="dashboard-collapse-button">
                Mehr anzeigen
              </span>
            )
          }
          expandIconPosition="right"
        >
          {panelRender}
        </Collapse>
      )}
    </>
  );
}
DashboardHelperFinishedRequests.propTypes = {
  requestList: PropTypes.array.isRequired
}
export default DashboardHelperFinishedRequests;
