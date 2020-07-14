import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Result, Spin } from 'antd';
import DashboardHelpSeekerFinishedRequests from './dashboardHelpSeekerFinishedRequests';
import DashboardHelpSeekerMenu from './dashboardHelpSeekerMenu';
import DashboardHelpSeekerActiveRequest from './dashboardHelpSeekerActiveRequest';
import DashboardHelperActiveRequest from './dashboardHelperActiveRequest';

const { Title } = Typography;

function DashboardHelpSeeker({
  activeRequestsHelpSeeker,
  activeRequestHelper,
  finishedRequestsHelpSeeker,
  finishedRequestsHelper
}) {
  const [menuKey, setMenuKey] = React.useState('request-1');
  const [activeRequestsHelpSeekerRender, setActiveRequestsHelpSeekerRender] = React.useState([]);
  const [activeRequestHelperRender, setActiveRequestHelperRender] = React.useState([]);

  React.useEffect(() => {
    setActiveRequestsHelpSeekerRender(activeRequestsHelpSeeker.map((entry, index) =>
      <DashboardHelpSeekerActiveRequest
        name={entry.name}
        phone={entry.phone}
        status={entry.status}
        requestType={entry.requestType}
        urgency={entry.urgency}
        carNecessary={entry.extras.carNecessary}
        prescriptionRequired={entry.extras.prescriptionRequired}
        address={entry.address}
      />
    ));
    //setMenuKey(activeRequests.length > 0 ? 0 : "finished");
  }, [activeRequestsHelpSeeker]);

  React.useEffect(() => {
    setActiveRequestHelperRender(activeRequestHelper &&
      <DashboardHelperActiveRequest
        name={entry.name}
        phone={entry.phone}
        status={entry.status}
        requestType={entry.requestType}
        urgency={entry.urgency}
        carNecessary={entry.extras.carNecessary}
        prescriptionRequired={entry.extras.prescriptionRequired}
        address={entry.address}
      />
    );
    //setMenuKey(activeRequests.length > 0 ? 0 : "finished");
  }, [activeRequestHelper]);

  const menuRender = (mode) => <DashboardHelpSeekerMenu
    mode={mode}
    menuKey={menuKey}
    setMenuKey={setMenuKey}
    activeRequestsHelpSeeker={activeRequestsHelpSeeker}
    activeRequestHelper={activeRequestHelper}
    finishedRequestsHelpSeeker={finishedRequestsHelpSeeker.length > 0}
    finishedRequestsHelper={finishedRequestsHelper.length > 0}
  />;

  return (
    <>
      <div className="dashboard-helpseeker-container">
        <div className="dashboard-menu-container">
          <div className="dashboard-menu-desktop">
            {menuRender("vertical")}
          </div>
          <div className="dashboard-menu-mobile">
            {menuRender("horizontal")}
          </div>
        </div>
        {/^hs\d+$/.test(menuKey) && activeRequestsHelpSeekerRender[menuKey.match(/\d+/)[0]]}
        {menuKey == "active-helper" && activeRequestHelperRender}
        {menuKey == "finished-helpseeker" &&
          <DashboardHelpSeekerFinishedRequests requestList={finishedRequestsHelpSeeker} />
        }
        {menuKey == "finished-helper" &&
          //<DashboardHelpSeekerFinishedRequests requestList={finishedRequestsHelper} />
          <>TBD</>
        }
        <div className="dashboard-tile-spacing" />
      </div>
    </>
  );
}
DashboardHelpSeeker.propTypes = {
  activeRequestsHelpSeeker: PropTypes.array.isRequired,
  activeRequestsHelper: PropTypes.array.isRequired,
  finishedRequestsHelpSeeker: PropTypes.array.isRequired,
  finishedRequestsHelper: PropTypes.array.isRequired
}
export default DashboardHelpSeeker;