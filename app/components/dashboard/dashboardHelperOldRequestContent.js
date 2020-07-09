import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

const { Text } = Typography;

function DashboardHelperOldRequestContent({
  startedAt,
  finishedAt,
  name,
  requestType,
  urgency,
  carNecessary,
  prescriptionRequired,
}) {
  const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const urgencyMapping = {
    now: 'dringend',
    today: 'heute',
    tomorrow: 'morgen',
    'this-week': 'diese Woche',
  };
  const requestTypeMapping = {
    	groceries: 'Lebensmittel',
    	medication: 'Medikamente',
    	other: 'Produkte',
  };

  const startedDate = new Date(startedAt * 1000);
  const startedDateString = `${startedDate.getDate()}. ${monthNames[startedDate.getMonth()]} ${startedDate.getFullYear()
								 }, ${startedDate.getHours()}:${startedDate.getMinutes()}`;
  const finishedDate = new Date(finishedAt * 1000);
  const finishedDateString = `${finishedDate.getDate()}. ${monthNames[finishedDate.getMonth()]} ${finishedDate.getFullYear()
								 }, ${finishedDate.getHours()}:${finishedDate.getMinutes()}`;

  return (
    <div className="dashboard-collapse-content">
      <div className="dashboard-collapse-content-container">
        <Text strong>Auftrag erstellt:</Text>
        <div>{startedDateString}</div>
        <Text strong>Auftrag abgeschlossen:</Text>
        <div>{finishedDateString}</div>
        <Text strong>Auftraggeber:</Text>
        <div>{name}</div>
      </div>
      <div className="dashboard-collapse-content-container">
        <Text strong>Typ des Auftrags:</Text>
        <div>{requestTypeMapping[requestType]}</div>
        <Text strong>Dringlichkeit:</Text>
        <div>{urgencyMapping[urgency]}</div>
        <Text strong>Auto benötigt:</Text>
        <div>{carNecessary ? 'Ja' : 'Nein'}</div>
        <Text strong>Rezept benötigt:</Text>
        <div>{prescriptionRequired ? 'Ja' : 'Nein'}</div>
      </div>
    </div>
  );
}
DashboardHelperOldRequestContent.propTypes = {
  startedAt: PropTypes.number.isRequired,
  finishedAt: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
  urgency: PropTypes.oneOf(['now', 'today', 'tomorrow', 'this-week']).isRequired,
  carNecessary: PropTypes.bool.isRequired,
  prescriptionRequired: PropTypes.bool.isRequired,
};
export default DashboardHelperOldRequestContent;
