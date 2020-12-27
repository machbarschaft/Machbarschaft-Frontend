import React from 'react';
import PropTypes from 'prop-types';
import RequestTypeOther from '../../assets/img/request-category/request-category-other.svg';
import RequestTypeGroceries from '../../assets/img/request-category/request-category-groceries.svg';
import RequestTypeMedication from '../../assets/img/request-category/request-category-medication.svg';

export default function AcceptRequestListEntry({
  number,
  address,
  requestType,
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
        {address.street}, {address.zipCode} {address.city}
      </div>
      {requestType === 'groceries' && (
        <img
          src={RequestTypeGroceries}
          className="accept-help-request-list-entry-category"
          alt=""
        />
      )}
      {requestType === 'medication' && (
        <img
          src={RequestTypeMedication}
          className="accept-help-request-list-entry-category"
          alt=""
        />
      )}
      {requestType === 'other' && (
        <img
          src={RequestTypeOther}
          className="accept-help-request-list-entry-category"
          alt=""
        />
      )}
      <div className="accept-help-request-list-entry-distance">
        {(distance / 1000).toFixed(1).replace('.', ',')}
        km
      </div>
    </div>
  );
}
AcceptRequestListEntry.propTypes = {
  number: PropTypes.number.isRequired,
  address: PropTypes.object.isRequired,
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
  distance: PropTypes.number.isRequired,
  hover: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};
