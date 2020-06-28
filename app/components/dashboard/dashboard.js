import React from 'react';
import ReactDOM from 'react-dom';
import AuthenticationContext from "../../contexts/authentication";
import DashboardHelper from "./dashboardHelper";

function DashboardWindow() {
	const authProps = React.useContext(AuthenticationContext);

	return (
		<div className="content-container-default background-light-grey">
			<DashboardHelper/>
		</div>
	);
}

export default DashboardWindow;