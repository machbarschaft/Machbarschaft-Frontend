import React from 'react';
import PropTypes from 'prop-types';

function DashboardTile({content}) {
	return (
		<div className={"dashboard-tile"}>
			{content}
		</div>
	);
}
DashboardTile.propTypes = {
	content: PropTypes.node.isRequired
};
export default DashboardTile;