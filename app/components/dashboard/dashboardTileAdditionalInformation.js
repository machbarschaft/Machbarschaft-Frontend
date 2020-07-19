import React from 'react';
import PropTypes from 'prop-types';
import DashboardTile from './dashboardTile';
import CarRequired from '../../assets/img/request-requirements/car-required.svg';
import CarNotRequired from '../../assets/img/request-requirements/car-not-required.svg';
import PrescriptionRequired from '../../assets/img/request-requirements/prescription-required.svg';
import PrescriptionNotRequired from '../../assets/img/request-requirements/prescription-not-required.svg';
import ClockIcon from '../../assets/img/clock-icon.svg';
import DashboardTileImgTextRow from './dashboardTileImgTextRow';

function DashboardTileAdditionalInformation({
  carNecessary,
  prescriptionRequired,
  timestamp,
}) {
  const creationDate = new Date(Date.parse(timestamp));
  const timeString = `${creationDate.toLocaleDateString()},${creationDate
    .getHours()
    .toString()
    .padStart(2, '0')}:${creationDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return (
    <DashboardTile
      title="Weitere Informationen"
      content={
        <>
          <DashboardTileImgTextRow
            imgSrc={carNecessary ? CarRequired : CarNotRequired}
            title={`${!carNecessary ? 'Kein ' : ''}Auto benötigt`}
          />
          <div className="dashboard-tile-spacing" />
          <DashboardTileImgTextRow
            imgSrc={
              prescriptionRequired
                ? PrescriptionRequired
                : PrescriptionNotRequired
            }
            title={`${!prescriptionRequired ? 'Kein ' : ''}Rezept benötigt`}
          />
          <div className="dashboard-tile-spacing" />
          <DashboardTileImgTextRow
            imgSrc={ClockIcon}
            title={`Auftrag erstellt: ${timeString}`}
          />
        </>
      }
    />
  );
}
DashboardTileAdditionalInformation.propTypes = {
  carNecessary: PropTypes.bool.isRequired,
  prescriptionRequired: PropTypes.bool.isRequired,
  timestamp: PropTypes.string.isRequired,
};
export default DashboardTileAdditionalInformation;
