import React from 'react';
import PropTypes from 'prop-types';
import DashboardTile from './dashboardTile';

function DashboardTileContact({ name, phone, street, zipCode, city }) {
  return (
    <DashboardTile
      title="Kontakt"
      content={
        <>
          <div className="dashboard-tile-spacing" />
          <div className="dashboard-tile-grid">
            {name !== undefined && (
              <>
                <span>Name:</span>
                <span>{name}</span>
              </>
            )}
            {phone !== undefined && (
              <>
                <span>Telefon:</span>
                <span>{phone}</span>
              </>
            )}
            {street !== undefined && (
              <>
                <span>Adresse:</span>
                <span>{street}</span>
              </>
            )}
            {zipCode !== undefined && city !== undefined && (
              <>
                <span>Ort:</span>
                <span>{`${zipCode} ${city}`}</span>
              </>
            )}
          </div>
        </>
      }
    />
  );
}
DashboardTileContact.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  street: PropTypes.string,
  zipCode: PropTypes.number,
  city: PropTypes.string,
};
export default DashboardTileContact;
