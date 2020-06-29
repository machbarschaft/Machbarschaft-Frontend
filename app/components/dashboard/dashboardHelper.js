import React from "react";
import DashboardTile from "./dashboardTile";
import DashboardTileHelperStatus from "./dashboardTileHelperStatus";
import DashboardTileContact from "./dashboardTileContact";
import DashboardTileUrgency from "./dashboardTileUrgency";
import DashboardTileRequestType from "./dashboardTileRequestType";

function DashboardHelper() {
	return (
		<>
			<DashboardTile content={<DashboardTileHelperStatus />} />
			<div className="dashboard-columns-container">
				<div className="dashboard-column">
					<DashboardTileContact
						name={"Max Schmidt"}
						phone={"040299960980"}
						street={"Höhenstadter Str."}
						zipCode={81671}
						city={"München"}
					/>
					<DashboardTileRequestType requestType={"groceries"} />
				</div>
				<div className="dashboard-column">
					<DashboardTileUrgency urgency={"now"} />
					<DashboardTile content={<><br/><br/><br/></>} />
				</div>
			</div>
		</>
	);
}

export default DashboardHelper;