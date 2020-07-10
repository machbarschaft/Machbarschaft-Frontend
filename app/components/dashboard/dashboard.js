import React from 'react';
import ReactDOM from 'react-dom';
import DashboardHelper from './dashboardHelper';
import DashboardHelpSeeker from './dashboardHelpSeeker';
import AuthenticationContext from '../../contexts/authentication';

function DashboardWindow() {
  const authProps = React.useContext(AuthenticationContext);

  /*
		<div className="content-container-default background-light-grey">
			<DashboardHelper/>
		</div>
	*/
  return (
    <div className="content-container-big background-light-grey">
      <DashboardHelpSeeker />
    </div>
  );
}

export default DashboardWindow;
