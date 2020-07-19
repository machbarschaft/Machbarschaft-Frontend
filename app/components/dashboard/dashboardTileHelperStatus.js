import React from 'react';
import { Button, notification } from 'antd';
import PropTypes from 'prop-types';
import DashboardTile from './dashboardTile';
import { putUpdateRequestStatus } from '../../utils/api/requestStatusApi';

function DashboardTileHelperStatus({ name, status, processId, refreshRequests }) {
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const updateStatus = () => {
    setUpdateLoading(true);
    putUpdateRequestStatus(processId)
      .then((res) => {
        setUpdateLoading(false);
        refreshRequests();
      })
      .catch((err) => {
        notification.error({
          message: 'Fehler',
          description: 'Es ist ein Fehler aufgetreten, bitte versuche es erneut!'
        });
        setUpdateLoading(false);
      })
  };
  const content = {
    accepted: (
      <>
        <div>
          <div className="dashboard-tile-helper-status-bold">
            Bitte jetzt {name} anrufen!
          </div>
          <div className="dashboard-tile-helper-status-default">
            Sobald du angerufen hast, wird dies hier angezeigt.
          </div>
        </div>
      </>
    ),
    called: (
      <>
        <div>
          <div className="dashboard-tile-helper-status-default">
            Sehr gut, du hast {name} angerufen!
          </div>
          <div className="dashboard-tile-helper-status-bold">
            Sobald du losgehst, klicke diesen Button:
          </div>
        </div>
        <Button type="primary" onClick={() => updateStatus()} loading={updateLoading}>
          ICH GEHE JETZT LOS
        </Button>
      </>
    ),
    'on-the-way': (
      <>
        <div className="dashboard-tile-helper-status-bold">
          Wenn Sie alles erledigt haben, klicken Sies diesen Button:
        </div>
        <Button type="primary" onClick={() => updateStatus()} loading={updateLoading}>
          AUFTRAG ABSCHLIESSEN
        </Button>
      </>
    ),
    'done': (
      <>
        <div className="dashboard-tile-helper-status-bold">
          Sie haben den Auftrag als erledigt markiert.
        </div>
      </>
    ),
    'aborted': (
      <>
        <div className="dashboard-tile-helper-status-bold">
          Sie haben den Auftrag als abgebrochen markiert.
        </div>
      </>
    ),
    'did-not-help': (
      <>
        <div className="dashboard-tile-helper-status-bold">
          Sie haben angegeben, dass Sie nicht helfen konnten.
        </div>
      </>
    )
  };

  return (
    <DashboardTile
      marginTop={false}
      content={
        <div className="dashboard-tile-helper-status-container">
          {content[status]}
        </div>
      }
    />
  );
}
DashboardTileHelperStatus.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["accepted", "called", "on-the-way", "done", "aborted", "did-not-help"]).isRequired,
  processId: PropTypes.string,
  refreshRequests: PropTypes.func.isRequired
};

export default DashboardTileHelperStatus;
