import React from 'react';
import PropTypes from 'prop-types';

export default function AcceptRequestListEntry({
  number,
  requestText,
  distance,
  hover,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={`accept-help-request-list-entry${
        hover ? ' accept-help-request-list-entry-hover' : ''
      }`}
      onClick={() => onClick()}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <div className="accept-help-request-list-entry-number">{number}</div>
      <div className="accept-help-request-list-entry-address">
        {requestText}
      </div>
      <div className="accept-help-request-list-entry-distance">
        {(distance / 1000).toFixed(1).replace('.', ',')}
        km
      </div>
    </div>
  );
}
AcceptRequestListEntry.propTypes = {
  number: PropTypes.number.isRequired,
  requestText: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  hover: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};
