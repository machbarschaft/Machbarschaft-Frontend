import React from 'react';
import ReactDOM from 'react-dom';
import AuthenticationContext from "../../contexts/authentication";

function DashboardWindow() {
	const authProps = React.useContext(AuthenticationContext);

	return (
		<div className="content-container-default">
			DashboardWindow
		</div>
	);
}

export default DashboardWindow;