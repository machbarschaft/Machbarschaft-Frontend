import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import DashboardHelpSeekerMenuActiveItem from './dashboardHelpSeekerMenuActiveItem';
import DashboardHelpSeekerMenuFinishedItem from './dashboardHelpSeekerMenuFinishedItem';

function DashboardHelpSeekerMenu({
  mode,
  menuKey,
  setMenuKey,
  activeRequestsHelpSeeker,
  activeRequestHelper,
  finishedRequestsHelpSeeker,
  finishedRequestsHelper
}) {
  return (
    <Menu onClick={(e) => setMenuKey(e.key)} selectedKeys={menuKey} mode={mode}>
      {activeRequestsHelpSeeker.map((entry, key) =>
        <DashboardHelpSeekerMenuActiveItem
          key={key}
          selectedKey={menuKey}
          requestType={entry.requestType}
          title={"AUFTRAG" + (key+1)}
        />
      )}
      
      {activeRequestHelper != null &&
        <DashboardHelpSeekerMenuActiveItem
          key={"active-helper"}
          selectedKey={menuKey}
          requestType={activeRequestHelper.requestType}
          title="MEIN AUFTRAG"
        />
      }
      {finishedRequestsHelpSeeker &&
        <DashboardHelpSeekerMenuFinishedItem
          key={"finished-helpseeker"}
          selectedKey={menuKey}
          title={"ALTE AUFTRÄGE AUFTRAGGEBER"}
      />
      }
      {finishedRequestsHelper &&
        <DashboardHelpSeekerMenuFinishedItem
          key={"finished-helper"}
          selectedKey={menuKey}
          title={"ALTE AUFTRÄGE AUFTRAGNEHMER"}
      />
      }
    </Menu>
  );
}
DashboardHelpSeekerMenu.propTypes = {
  mode: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  menuKey: PropTypes.any.isRequired,
  setMenuKey: PropTypes.func.isRequired,
  activeRequestsHelpSeeker: PropTypes.array.isRequired,
  activeRequestHelper: PropTypes.object.isRequired,
  finishedRequestsHelpSeeker: PropTypes.bool.isRequired,
  finishedRequestsHelper: PropTypes.bool.isRequired
};
export default DashboardHelpSeekerMenu;
