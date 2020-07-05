import React from 'react';
import {Button} from 'antd';
import PropTypes from 'prop-types';
import DashboardTile from "./dashboardTile";

function DashboardTileHelperStatus({name, status}) {
	const content = {
		"accepted":
			<>
				<div>
					<div className={"dashboard-tile-helper-status-bold"}>
						Bitte jetzt {name} anrufen!
					</div>
					<div className={"dashboard-tile-helper-status-default"}>
						Sobald du angerufen hast, wird dies hier angezeigt.
					</div>
				</div>
			</>,
		"called":
			<>
				<div>
					<div className={"dashboard-tile-helper-status-default"}>
						Sehr gut, du hast {name} angerufen!
					</div>
					<div className={"dashboard-tile-helper-status-bold"}>
						Sobald du losgehst, klicke diesen Button:
					</div>
				</div>
				<Button type="primary">ICH GEHE JETZT LOS</Button>
			</>,
		"on-the-way":
			<>
				<div className={"dashboard-tile-helper-status-bold"}>
					Wenn du alles erledigt hast, klicke diesen Button:
				</div>
				<Button type="primary">AUFTRAG ABSCHLIESSEN</Button>
			</>
	}

	return (
		<DashboardTile marginTop={false} content={
			<div className={"dashboard-tile-helper-status-container"}>{content[status]}</div>
		}/>
	);
}
DashboardTileHelperStatus.propTypes = {
	name: PropTypes.string.isRequired,
	status: PropTypes.oneOf(["accepted", "called", "on-the-way"]).isRequired
};

export default DashboardTileHelperStatus;
