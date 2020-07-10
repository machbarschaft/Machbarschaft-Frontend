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

function DashboardHelpSeekerMenu({ mode, menuKey, setMenuKey, currentRequests }) {
  const requestTypeImages = {
    groceries: RequestTypeGroceries,
    medication: RequestTypeMedication,
    other: RequestTypeOther
  };
  const requestTypeImagesWhite = {
    groceries: RequestTypeGroceriesWhite,
    medication: RequestTypeMedicationWhite,
    other: RequestTypeOtherWhite
  };

  return (
    <Menu onClick={(e) => setMenuKey(e.key)} selectedKeys={menuKey} mode={mode}>
      {currentRequests.map((entry, key) =>
        <Menu.Item
          key={key}
          className={
            mode == 'vertical' &&
            ("dashboard-menu-button" + (menuKey == key ? " dashboard-menu-button-selected" : " dashboard-menu-button-default"))
          }
        >
          {mode == 'vertical' && (
            <div className="dashboard-menu-request-types">
              <img
                className="dashboard-menu-request-type-image"
                src={
                  menuKey == key
                    ? requestTypeImagesWhite[entry.requestType]
                    : requestTypeImages[entry.requestType]
                }
              />
            </div>
          )}
          <span>AUFTRAG {key+1}</span>
        </Menu.Item>
      )}
      
      <Menu.Item
        key="finished"
        className={
          mode == 'vertical' &&
          ("dashboard-menu-button" + (menuKey == "finished" ? " dashboard-menu-button-selected" : " dashboard-menu-button-default"))
        }
      >
        {mode == 'vertical' && (
          <div className="dashboard-menu-request-types">
            <img
              className="dashboard-menu-request-type-image"
              src={menuKey == "finished" ? ClockIconWhite : ClockIcon}
            />
          </div>
        )}
        <span>ERLEDIGTE AUFTRÄGE</span>
      </Menu.Item>
    </Menu>
  );
}
DashboardHelpSeekerMenu.propTypes = {
  mode: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  menuKey: PropTypes.any.isRequired,
  setMenuKey: PropTypes.func.isRequired,
  currentRequests: PropTypes.array.isRequired
};
export default DashboardHelpSeekerMenu;
