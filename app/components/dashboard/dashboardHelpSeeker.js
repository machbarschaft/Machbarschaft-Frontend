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
  const [menuKey, setMenuKey] = React.useState("");
  const [activeRequestsHelpSeekerRender, setActiveRequestsHelpSeekerRender] = React.useState([]);

  const selectMenuKey = () => {
    var changeRequired = false;
    if(menuKey == "") changeRequired = true;
    else if(menuKey == /^hs\d+$/.test(menuKey) && activeRequestsHelpSeeker.length <= menuKey.match(/\d+/)[0]) changeRequired = true;
    else if(menuKey == "active-helper" && activeRequestHelper == null) changeRequired = true;
    else if(menuKey == "finished-helpseeker" && finishedRequestsHelpSeeker.length == 0) changeRequired = true;
    else if(menuKey == "finished-helper" && finishedRequestsHelper == 0) changeRequired = true;

    if(changeRequired) {
      if(activeRequestsHelpSeeker.length > 0) setMenuKey("hs0");
      else if(activeRequestHelper != null) setMenuKey("active-helper");
      else if(finishedRequestsHelpSeeker.length > 0) setMenuKey("finished-helpseeker");
      else if(finishedRequestsHelpSeeker.length > 0) setMenuKey("finished-helper");
    }
  };

  React.useEffect(() => {
    setActiveRequestsHelpSeekerRender(activeRequestsHelpSeeker.map((entry) =>
      <DashboardHelpSeekerActiveRequest
        name={entry.name}
        phone={entry.phone}
        status={entry.status}
        requestType={entry.requestType}
        urgency={entry.urgency}
        carNecessary={entry.extras.carNecessary}
        prescriptionRequired={entry.extras.prescriptionRequired}
        address={entry.address}
        startedAt={entry.startedAt}
      />
    ));
    selectMenuKey();
  }, [activeRequestsHelpSeeker]);

  React.useEffect(() => {
    selectMenuKey();
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
        {menuKey == "active-helper" && activeRequestHelper != null &&
          <DashboardHelperActiveRequest
            name={activeRequestHelper.name}
            phone={activeRequestHelper.phone}
            status={activeRequestHelper.status}
            requestType={activeRequestHelper.requestType}
            urgency={activeRequestHelper.urgency}
            carNecessary={activeRequestHelper.extras.carNecessary}
            prescriptionRequired={activeRequestHelper.extras.prescriptionRequired}
            address={activeRequestHelper.address}
            startedAt={activeRequestHelper.startedAt}
          />
        }
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
  activeRequestHelper: PropTypes.object.isRequired,
  finishedRequestsHelpSeeker: PropTypes.array.isRequired,
  finishedRequestsHelper: PropTypes.array.isRequired
}
export default DashboardHelpSeeker;