import React from 'react';
import DashboardTile from "./dashboardTile";

function DashboardTileHelperStatus() {
	return (
		<DashboardTile content={
			<div className={"dashboard-helper-status"}>
				<div>
					Wenn du alles erledigt hast, klicke den Button rechts:
				</div>
			</div>
		}/>
	);
}
export default DashboardTileHelperStatus;