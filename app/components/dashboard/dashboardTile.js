import React from 'react';
import {Typography} from 'antd';
import PropTypes from 'prop-types';
const {Text} = Typography;


function DashboardTile({title, content}) {
	return (
		<div className={"dashboard-tile"}>
			{title !== undefined &&
				<>
					<Text strong>{title}</Text>
					<div className={"dashboard-tile-spacing"}></div>
				</>
			}
			{content}
		</div>
	);
}
DashboardTile.propTypes = {
	title: PropTypes.node,
	content: PropTypes.node.isRequired
};
export default DashboardTile;