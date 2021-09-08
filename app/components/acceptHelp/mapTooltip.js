import React from 'react';
import PropTypes from 'prop-types';

export default function MapTooltip({ distance }) {
  return (
    <div className="map-tooltip">
      <div className="map-tooltip-info">
        <div>Distanz:</div>
        <div className="map-tooltip-centered">
          {(distance / 1000).toFixed(1).replace('.', ',')}km
        </div>
      </div>
      <div className="map-tooltip-pointer" />
    </div>
  );
}
MapTooltip.propTypes = {
  distance: PropTypes.number.isRequired,
};
