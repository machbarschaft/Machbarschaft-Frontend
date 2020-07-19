import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import DashboardTile from './dashboardTile';

const { Text } = Typography;

function DashboardTileHelpSeekerStatus({ name, phone, status }) {
  let content;
  const statusMapping = {
    open: 'Bisher hat kein Helfer den Auftrag angenommen.',
    accepted: 'Der Auftrag wurde angenommen.',
    called: 'Es wurden Details per Telefon besprochen.',
    'on-the-way': 'Der Helfer ist unterwegs.',
    done: 'Der Helfer hat den Auftrag als erledigt markiert.',
    aborted: 'Der Helfer hat den Auftrag abgebrochen.',
    'did-not-help':
      'Der Helfer hat angegeben, dass er Ihnen nicht helfen konnte.',
  };
  if (status === 'open') {
    content = (
      <>
        <div className="dashboard-tile-spacing" />
        {statusMapping[status]}
      </>
    );
  } else if (
    status === 'accepted' ||
    status === 'called' ||
    status === 'on-the-way' ||
    status === 'done' ||
    status === 'aborted' ||
    status === 'did-not-help'
  ) {
    content = (
      <>
        <div className="dashboard-tile-spacing" />
        <div className="dashboard-tile-grid">
          <span>Name:</span>
          <span>{name}</span>
          <span>Telefon:</span>
          <span>{`0${phone}`}</span>
          <span>
            <Text strong>Status: </Text>
          </span>
          <span>
            <Text strong>{statusMapping[status]}</Text>
          </span>
        </div>
      </>
    );
  } else content = <>Der Status kann nicht angezeigt werden.</>;

  return <DashboardTile title="Ihr Helfer" content={content} />;
}
DashboardTileHelpSeekerStatus.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.number,
  status: PropTypes.oneOf([
    'open',
    'accepted',
    'called',
    'on-the-way',
    'done',
    'aborted',
    'did-not-help',
  ]).isRequired,
};

export default DashboardTileHelpSeekerStatus;
