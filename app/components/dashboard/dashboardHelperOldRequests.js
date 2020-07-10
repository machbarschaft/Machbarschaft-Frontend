import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Result, Collapse } from 'antd';
import DashboardOldRequestHeader from './dashboardOldRequestHeader';
import DashboardHelperOldRequestContent from './dashboardHelperOldRequestContent';

const { Title } = Typography;
const { Panel } = Collapse;

function DashboardHelperOldRequests({requestList}) {
  const panelRender = requestList.map((entry, index) => (
    <Panel
      header={
        <DashboardOldRequestHeader
          finishedAt={entry.finishedAt}
          requestType={entry.requestType}
        />
      }
      key={index}
    >
      <DashboardHelperOldRequestContent
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
DashboardHelperOldRequests.propTypes = {
  requestList: PropTypes.array.isRequired
}
export default DashboardHelperOldRequests;
