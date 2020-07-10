import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Collapse, Result } from 'antd';
import DashboardOldRequestHeader from './dashboardOldRequestHeader';
import DashboardHelpSeekerOldRequestContent from './dashboardHelpSeekerOldRequestContent';

const { Title } = Typography;
const { Panel } = Collapse;

function DashboardHelpSeekerOldRequests({requestList}) {

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
      <DashboardHelpSeekerOldRequestContent
        startedAt={entry.startedAt}
        name={entry.name}
        phone={entry.phon}
        street={entry.address.street}
        zipCode={entry.address.zipCode}
        city={entry.address.city}
        requestType={entry.requestType}
        urgency={entry.urgency}
        carNecessary={entry.extras.carNecessary}
        prescriptionRequired={entry.extras.prescriptionRequired}
      />
    </Panel>
  ));

  return (
    <>
      {requestList.length == 0 ? (
        <Result title="Es gibt keine alten Aufträge" />
      ) : (
        <div className="dashboard-helps-seeker-old-request">
          {requestList.length == 0 ? (
            'Du hast noch keinen Auftrag abgeschlossen.'
          ) : (
            <Collapse
              className="dashboard-collapse"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <span className="dashboard-collapse-button dashboard-collapse-button-selected">
                    Weniger anzeigen
                  </span>
                ) : (
                  <span className="dashboard-collapse-button">Mehr anzeigen</span>
                )
              }
              expandIconPosition="right"
            >
              {panelRender}
            </Collapse>
          )}
        </div>
      )}
    </>
  );
}
DashboardHelpSeekerOldRequests.propTypes = {
  requestList: PropTypes.array.isRequired
}
export default DashboardHelpSeekerOldRequests;
