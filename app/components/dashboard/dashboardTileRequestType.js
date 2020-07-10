import React from 'react';
import PropTypes from 'prop-types';
import DashboardTile from './dashboardTile';
import RequestTypeOther from '../../assets/img/request-category/request-category-other.svg';
import RequestTypeGroceries from '../../assets/img/request-category/request-category-groceries.svg';
import RequestTypeMedication from '../../assets/img/request-category/request-category-medication.svg';
import DashboardTileImgTextRow from './dashboardTileImgTextRow';

function DashboardTileRequestType({ requestType }) {
  return (
    <DashboardTile
      title="Typ des Auftrags"
      content={
        <div className="dashboard-tile-row-container">
          {requestType.includes('medication') && (
            <DashboardTileImgTextRow
              imgSrc={RequestTypeMedication}
              title="Medikamente einkaufen"
            />
          )}
          {requestType.includes('groceries') && (
            <DashboardTileImgTextRow
              imgSrc={RequestTypeGroceries}
              title="Lebensmittel einkaufen"
              className="dashboard-tile-spacing"
            />
          )}
          {requestType.includes('other') && (
            <DashboardTileImgTextRow
              imgSrc={RequestTypeOther}
              title="Produkte einkaufen"
            />
          )}
        </div>
      }
    />
  );
}
DashboardTileRequestType.propTypes = {
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
};
export default DashboardTileRequestType;
