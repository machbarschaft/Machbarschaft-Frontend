import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

const { Text } = Typography;

function DashboardTile({ title, content }) {
  return (
    <div className="dashboard-tile">
      {title !== undefined
				&& (
<>
  <Text strong className="dashboard-tile-spacing">{title}</Text>
</>
				)}
      {content}
    </div>
  );
}
DashboardTile.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node.isRequired,
};
export default DashboardTile;
