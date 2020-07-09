import React from 'react';
import { Typography, Collapse } from 'antd';
import DashboardOldRequestHeader from './dashboardOldRequestHeader';
import DashboardHelpSeekerOldRequestContent from './dashboardHelpSeekerOldRequestContent';

const { Title } = Typography;
const { Panel } = Collapse;

function DashboardHelpSeekerOldRequests() {
  const requestList = [
    // ToDo: fetch from backend
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
        zipCode: '81671',
        city: 'München',
      },
      request: {
        requestType: 'groceries',
        urgency: 'now',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      startedAt: 1593774600, // ToDo: in which form do we get it from backend? probably stored in the response model?
      finishedAt: 1593869056, // ToDo: in which form do we get it from backend? probably stored in the process model (finishedAt)?
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
        zipCode: '81671',
        city: 'München',
      },
      request: {
        requestType: 'medication',
        urgency: 'now',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      startedAt: 1593774600,
      finishedAt: 1593869056,
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
        zipCode: '81671',
        city: 'München',
      },
      request: {
        requestType: 'other',
        urgency: 'now',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      startedAt: 1593774600,
      finishedAt: 1593869056,
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
        zipCode: '81671',
        city: 'München',
      },
      request: {
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
      header={
        <DashboardOldRequestHeader
          finishedAt={entry.finishedAt}
          requestType={entry.request.requestType}
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
        requestType={entry.request.requestType}
        urgency={entry.request.urgency}
        carNecessary={entry.request.extras.carNecessary}
        prescriptionRequired={entry.request.extras.prescriptionRequired}
      />
    </Panel>
  ));

  return (
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
  );
}
export default DashboardHelpSeekerOldRequests;
