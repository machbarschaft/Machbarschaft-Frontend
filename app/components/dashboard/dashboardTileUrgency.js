import React from 'react';
import PropTypes from 'prop-types';
import DashboardTile from './dashboardTile';

function DashboardTileUrgency({ urgency }) {
  const urgencyMapping = {
    now: 'sobald wie möglich',
    today: 'heute',
    tomorrow: 'morgen',
    'this-week': 'diese Woche',
  };
  return (
    <DashboardTile
      title="Dringlichkeit"
      content={
        urgency in urgencyMapping ? (
          <>Der Auftrag soll{urgencyMapping[urgency]} bearbeitet werden.</>
        ) : (
          <>Unbekannte Dringlichkeit</>
        )
      }
    />
  );
}
DashboardTileUrgency.propTypes = {
  urgency: PropTypes.oneOf(['now', 'today', 'tomorrow', 'this-week'])
    .isRequired,
};
export default DashboardTileUrgency;
