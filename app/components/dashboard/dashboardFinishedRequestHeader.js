import React from 'react';
import PropTypes from 'prop-types';
import RequestTypeOther from '../../assets/img/request-category/request-category-other.svg';
import RequestTypeGroceries from '../../assets/img/request-category/request-category-groceries.svg';
import RequestTypeMedication from '../../assets/img/request-category/request-category-medication.svg';

function DashboardHelperFinishedRequestHeader({ finishedAt, requestType }) {
  const monthNames = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  const finishedDate = new Date(Date.parse(finishedAt));
  const dateString = `${finishedDate.getDate()}. ${
    monthNames[finishedDate.getMonth()]
  } ${finishedDate.getFullYear()}`;

  return (
    <div className="display-flex">
      {dateString}
      <div className="dashboard-collapse-request-category">
        {requestType == 'groceries' && <img src={RequestTypeGroceries}/>}
        {requestType == 'medication' && <img src={RequestTypeMedication}/>}
        {requestType == 'other' && <img src={RequestTypeOther}/>}
      </div>
    </div>
  );
}
DashboardHelperFinishedRequestHeader.propTypes = {
  finishedAt: PropTypes.string.isRequired,
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
};
export default DashboardHelperFinishedRequestHeader;
