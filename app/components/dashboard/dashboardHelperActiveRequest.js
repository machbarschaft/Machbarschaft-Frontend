import React from 'react';
import PropTypes from 'prop-types';
import { Button, notification } from 'antd';
import DashboardTile from './dashboardTile';
import DashboardTileHelperStatus from './dashboardTileHelperStatus';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';
import { putAbortResponse } from '../../utils/api/responseApi';

export default function DashboardHelperActiveRequest({
  name,
  phoneHelpSeeker,
  status,
  requestType,
  urgency,
  carNecessary,
  prescriptionRequired,
  address,
  startedAt,
  processId,
  refreshRequests,
}) {
  const [abortLoading, setAbortLoading] = React.useState(false);
  const [abortWindowOpen, setAbortWindowOpen] = React.useState(false);
  const abortRequest = () => {
    setAbortLoading(true);
    putAbortResponse(processId)
      .then((res) => {
        setAbortLoading(false);
        notification.success({
          message: 'Fertig',
          description: 'Auftrag erfolgreich abgebrochen!',
        });
        refreshRequests();
      })
      .catch((err) => {
        notification.error({
          message: 'Fehler',
          description:
            'Es ist ein Fehler aufgetreten, bitte versuche es erneut!',
        });
        setAbortLoading(false);
      });
  };

  return (
    <div className="full-width">
      <DashboardTileHelperStatus
        name={name}
        status={status}
        processId={processId}
        refreshRequests={() => refreshRequests()}
      />
      <div className="dashboard-columns-container">
        <div className="dashboard-column">
          <DashboardTileContact
            name={name}
            phone={phoneHelpSeeker}
            street={address !== undefined ? address.street : undefined}
            zipCode={address !== undefined ? address.zipCode : undefined}
            city={address !== undefined ? address.city : undefined}
          />
          <br />
          <DashboardTileRequestType requestType={requestType} />
          {!abortWindowOpen && (
            <div className="dashboard-cancel-button-container">
              <Button
                className="dashboard-cancel-button"
                type="primary"
                onClick={() => setAbortWindowOpen(true)}
              >
                AUFTRAG ABBRECHEN
              </Button>
            </div>
          )}
          {abortWindowOpen && (
            <DashboardTile
              title="Wollen Sie den Auftrag wirklich abbrechen?"
              content={
                <div className="horizontal-center">
                  <Button
                    type="primary"
                    onClick={() => abortRequest()}
                    loading={abortLoading}
                  >
                    JA
                  </Button>
                  <Button
                    className="spacing-left"
                    type="primary"
                    onClick={() => setAbortWindowOpen(false)}
                  >
                    NEIN
                  </Button>
                </div>
              }
            />
          )}
        </div>
        <div className="dashboard-column">
          <DashboardTileUrgency urgency={urgency} />
          <DashboardTileAdditionalInformation
            carNecessary={carNecessary}
            prescriptionRequired={prescriptionRequired}
            timestamp={startedAt}
          />
        </div>
      </div>
    </div>
  );
}
DashboardHelperActiveRequest.propTypes = {
  name: PropTypes.string.isRequired,
  phoneHelpSeeker: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['accepted', 'called', 'on-the-way', 'done'])
    .isRequired,
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
  urgency: PropTypes.oneOf(['now', 'today', 'tomorrow', 'this-week'])
    .isRequired,
  carNecessary: PropTypes.bool.isRequired,
  prescriptionRequired: PropTypes.bool.isRequired,
  address: PropTypes.object,
  startedAt: PropTypes.string.isRequired,
  processId: PropTypes.string,
  refreshRequests: PropTypes.func.isRequired,
};
