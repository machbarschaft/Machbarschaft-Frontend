import React from 'react';
import ReactDOM from 'react-dom';
import DashboardHelper from "./dashboardHelper";
import AuthenticationContext from "../../contexts/authentication";

function DashboardWindow() {
	const authProps = React.useContext(AuthenticationContext);

	return (
		<div className="content-container-default background-light-grey">
			<DashboardHelper/>
		</div>
	);
}

export default DashboardWindow;