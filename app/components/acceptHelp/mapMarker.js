import React from 'react';
import PropTypes from 'prop-types';
import PlacePin from '../../assets/img/maps/place-pin.svg';
import MapTooltip from './mapTooltip';

export default function MapMarker({
  requestType,
  distance,
  hover,
  selected,
  onMarkerSelect,
  onMarkerEnter,
  onMarkerLeave,
  $hover,
}) {
  return (
    <div
      className={`map-place-container${
        $hover || hover ? ' map-place-container-hover' : ''
      }`}
    >
      <img
        className="map-marker"
        onClick={() => onMarkerSelect()}
        onMouseEnter={() => onMarkerEnter()}
        onMouseLeave={() => onMarkerLeave()}
        src={PlacePin}
        alt=""
      />
      {($hover || hover || selected) && (
        <MapTooltip categories={requestType} distance={distance} />
      )}
    </div>
  );
}
MapMarker.propTypes = {
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
  distance: PropTypes.number.isRequired,
  hover: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  onMarkerSelect: PropTypes.func.isRequired,
  onMarkerEnter: PropTypes.func.isRequired,
  onMarkerLeave: PropTypes.func.isRequired,
};
