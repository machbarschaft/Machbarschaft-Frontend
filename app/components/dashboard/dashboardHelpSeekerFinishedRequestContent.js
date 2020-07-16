import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';

const { Text } = Typography;

function DashboardHelpSeekerFinishedRequestContent({
  startedAt,
  name,
  phone,
  street,
  zipCode,
  city,
  requestType,
  urgency,
  carNecessary,
  prescriptionRequired,
}) {
  return (
    <div className="dashboard-helper-finished-request-grid">
      <DashboardTileContact name={name} phone={phone} />
      <DashboardTileUrgency urgency="now" />
      <DashboardTileContact
        phone={phone}
        street={street}
        zipCode={zipCode}
        city={city}
      />
      <DashboardTileRequestType requestType="groceries" />
      <DashboardTileAdditionalInformation
        carNecessary
        prescriptionRequired={false}
        timestamp={1593672043}
      />
    </div>
  );
}
DashboardHelpSeekerFinishedRequestContent.propTypes = {
  startedAt: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
  urgency: PropTypes.oneOf(['now', 'today', 'tomorrow', 'this-week'])
    .isRequired,
  carNecessary: PropTypes.bool.isRequired,
  prescriptionRequired: PropTypes.bool.isRequired,
};
export default DashboardHelpSeekerFinishedRequestContent;
