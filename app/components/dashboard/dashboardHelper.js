import React from "react";
import DashboardTile from "./dashboardTile";
import DashboardTileHelperStatus from "./dashboardTileHelperStatus";
import DashboardTileContact from "./dashboardTileContact";

function DashboardHelper() {
	return (
		<>
			<DashboardTile content={<DashboardTileHelperStatus />} />
			<div className="dashboard-columns-container">
				<div className="dashboard-column">
					<DashboardTile content={
						<DashboardTileContact
							name={"Max Schmidt"}
							phone={"040299960980"}
							phoneCode={"957563"}
							address={"Höhenstadter Str."}
							city={"81671 München"}
						/>
					} />
					<DashboardTile content={<><br/><br/><br/></>} />
				</div>
				<div className="dashboard-column">
					<DashboardTile content={<><br/><br/><br/></>} />
					<DashboardTile content={<><br/><br/><br/></>} />
				</div>
			</div>
		</>
	);
}

export default DashboardHelper;