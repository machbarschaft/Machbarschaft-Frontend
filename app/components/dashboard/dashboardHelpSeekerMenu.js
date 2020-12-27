import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import RequestTypeOther from '../../assets/img/request-category/request-category-other.svg';
import RequestTypeGroceries from '../../assets/img/request-category/request-category-groceries.svg';
import RequestTypeMedication from '../../assets/img/request-category/request-category-medication.svg';
import RequestTypeOtherWhite from '../../assets/img/request-category/request-category-other-white.svg';
import RequestTypeGroceriesWhite from '../../assets/img/request-category/request-category-groceries-white.svg';
import RequestTypeMedicationWhite from '../../assets/img/request-category/request-category-medication-white.svg';
import ClockIcon from '../../assets/img/clock-icon.svg';
import ClockIconWhite from '../../assets/img/clock-icon-white.svg';

function DashboardHelpSeekerMenu({
  mode,
  menuKey,
  setMenuKey,
  activeRequestsHelpSeeker,
  activeRequestsHelper,
  finishedRequestsHelpSeeker,
  finishedRequestsHelper,
}) {
  const requestTypeImages = {
    groceries: RequestTypeGroceries,
    medication: RequestTypeMedication,
    other: RequestTypeOther,
  };
  const requestTypeImagesWhite = {
    groceries: RequestTypeGroceriesWhite,
    medication: RequestTypeMedicationWhite,
    other: RequestTypeOtherWhite,
  };
  const dashboardHelpSeekerMenuActiveItem = (
    key,
    selectedKey,
    requestType,
    title
  ) => (
    <Menu.Item
      key={key}
      className={
        mode === 'vertical' &&
        `dashboard-menu-button${
          selectedKey === key
            ? ' dashboard-menu-button-selected'
            : ' dashboard-menu-button-default'
        }`
      }
    >
      {mode === 'vertical' && (
        <div className="dashboard-menu-request-types">
          <img
            className="dashboard-menu-request-type-image"
            src={
              selectedKey === key
                ? requestTypeImagesWhite[requestType]
                : requestTypeImages[requestType]
            }
            alt=""
          />
        </div>
      )}
      <span>{title}</span>
    </Menu.Item>
  );
  const dashboardHelpSeekerMenuFinishedItem = (key, selectedKey, title) => (
    <Menu.Item
      key={key}
      className={
        mode === 'vertical' &&
        `dashboard-menu-button${
          menuKey === key
            ? ' dashboard-menu-button-selected'
            : ' dashboard-menu-button-default'
        }`
      }
    >
      {mode === 'vertical' && (
        <div className="dashboard-menu-request-types">
          <img
            className="dashboard-menu-request-type-image"
            src={selectedKey === key ? ClockIconWhite : ClockIcon}
            alt=""
          />
        </div>
      )}
      <span>{title}</span>
    </Menu.Item>
  );

  return (
    <Menu onClick={(e) => setMenuKey(e.key)} selectedKeys={menuKey} mode={mode}>
      {activeRequestsHelpSeeker.map((entry, key) =>
        dashboardHelpSeekerMenuActiveItem(
          `hs${key}`,
          menuKey,
          entry.requestType,
          `AUFTRAG ${key + 1}`
        )
      )}

      {activeRequestsHelper.map((entry, key) =>
        dashboardHelpSeekerMenuActiveItem(
          `h${key}`,
          menuKey,
          entry.requestType,
          `MEIN AUFTRAG ${key + 1}`
        )
      )}
      {finishedRequestsHelpSeeker &&
        dashboardHelpSeekerMenuFinishedItem(
          'finished-helpseeker',
          menuKey,
          'ALTE AUFTRÄGE (AUFTRAGGEBER)'
        )}
      {finishedRequestsHelper &&
        dashboardHelpSeekerMenuFinishedItem(
          'finished-helper',
          menuKey,
          'ALTE AUFTRÄGE (AUFTRAGNEHMER)'
        )}
    </Menu>
  );
}
DashboardHelpSeekerMenu.propTypes = {
  mode: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  menuKey: PropTypes.any.isRequired,
  setMenuKey: PropTypes.func.isRequired,
  activeRequestsHelpSeeker: PropTypes.array.isRequired,
  activeRequestsHelper: PropTypes.array.isRequired,
  finishedRequestsHelpSeeker: PropTypes.bool.isRequired,
  finishedRequestsHelper: PropTypes.bool.isRequired,
};
export default DashboardHelpSeekerMenu;
