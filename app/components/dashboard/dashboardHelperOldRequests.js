import React from 'react';
import { Typography, Collapse } from 'antd';
import DashboardOldRequestHeader from './dashboardOldRequestHeader';
import DashboardHelperOldRequestContent from './dashboardHelperOldRequestContent';

const { Title } = Typography;
const { Panel } = Collapse;

function DashboardHelperOldRequests() {
  const requestList = [ // ToDo: fetch from backend
    {
      request: {
        name: 'Max Schmidt',
        requestType: 'groceries',
        urgency: 'now',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      startedAt: 1593774600, // ToDo: in which form do we get it from backend? probably stored in the response model?
      finishedAt: 1593869056, // ToDo: in which form do we get it from backend? probably stored in the process model (finishedAt)?
    }, {
      request: {
        name: 'Max Schmidt',
        requestType: 'medication',
        urgency: 'now',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      startedAt: 1593774600,
      finishedAt: 1593869056,
    }, {
      request: {
        name: 'Max Schmidt',
        requestType: 'other',
        urgency: 'now',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      startedAt: 1593774600,
      finishedAt: 1593869056,
    }, {
      request: {
        name: 'Max Schmidt',
        requestType: 'groceries',
        urgency: 'now',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      startedAt: 1593774600,
      finishedAt: 1593869056,
    },
  ];
  const panelRender = requestList.map((entry, index) => (
    <Panel
      header={<DashboardOldRequestHeader finishedAt={entry.finishedAt} requestType={entry.request.requestType} />}
      key={index}
    >
      <DashboardHelperOldRequestContent
        startedAt={entry.startedAt}
        finishedAt={entry.finishedAt}
        name={entry.request.name}
        requestType={entry.request.requestType}
        urgency={entry.request.urgency}
        carNecessary={entry.request.extras.carNecessary}
        prescriptionRequired={entry.request.extras.prescriptionRequired}
      />
    </Panel>
  ));

  return (
    <>
      <Title level={2} style={{ marginTop: '1em' }}>Alte Aufträge</Title>
      {requestList.length == 0 ? 'Du hast noch keinen Auftrag abgeschlossen.'
			  :				(
  <Collapse
    className="dashboard-collapse"
    expandIcon={({ isActive }) => (isActive ? <span className="dashboard-collapse-button dashboard-collapse-button-selected">Weniger anzeigen</span>
      :						<span className="dashboard-collapse-button">Mehr Informationen anzeigen</span>)}
    expandIconPosition="right"
  >
    {panelRender}
  </Collapse>
        )}
    </>
  );
}
export default DashboardHelperOldRequests;
