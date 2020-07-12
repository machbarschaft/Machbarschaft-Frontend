import React from 'react';
import { Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import DashboardTile from './dashboardTile';

const { Text } = Typography;

function DashboardTileHelpSeekerStatus({ name, phone, status }) {
  let content;

  if (status == 'open') {
    content = (
      <>
        <div className="dashboard-tile-spacing" />
        Bisher hat kein Helfer den Auftrag angenommen.
      </>
    );
  } else if (status == 'accepted' || status == 'on-the-way') {
    content = (
      <>
        <div className="dashboard-tile-spacing" />
        <div className="dashboard-tile-grid">
          <span>Name:</span>
          <span>{name}</span>
          <span>Telefon:</span>
          <span>{phone}</span>
          <span>
            <Text strong>Status: </Text>
          </span>
          <span>
            <Text strong>
              {status === 'accepted' ? 'angenommen' : 'auf dem Weg'}
            </Text>
          </span>
        </div>
      </>
    );
  } else content = <>Der Status kann nicht angezeigt werden.</>;

  return <DashboardTile title="Ihr Helfer" content={content} />;
}
DashboardTileHelpSeekerStatus.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.oneOf(['open', 'accepted', 'on-the-way'])
    .isRequired,
};

export default DashboardTileHelpSeekerStatus;
