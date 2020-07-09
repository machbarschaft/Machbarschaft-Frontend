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

function DashboardHelpSeekerMenu({ mode, menuKey, setMenuKey }) {
  return (
    <Menu onClick={(e) => setMenuKey(e.key)} selectedKeys={menuKey} mode={mode}>
      <Menu.Item
        key="request-1"
        className={
          mode == 'vertical' &&
          `dashboard-menu-button${
            menuKey == 'request-1'
              ? ' dashboard-menu-button-selected'
              : ' dashboard-menu-button-default'
          }`
        }
      >
        {mode == 'vertical' && (
          <div className="dashboard-menu-request-types">
            <img
              className="dashboard-menu-request-type-image"
              src={
                menuKey == 'request-1'
                  ? RequestTypeOtherWhite
                  : RequestTypeOther
              }
            />
          </div>
        )}
        <span>AUFTRAG 1</span>
      </Menu.Item>
      <Menu.Item
        key="old-requests"
        className={
          mode == 'vertical' &&
          `dashboard-menu-button ${
            menuKey == 'old-requests'
              ? ' dashboard-menu-button-selected'
              : ' dashboard-menu-button-default'
          }`
        }
      >
        {mode == 'vertical' && (
          <div className="dashboard-menu-request-types">
            <img
              className="dashboard-menu-request-type-image"
              src={menuKey == 'old-requests' ? ClockIconWhite : ClockIcon}
            />
          </div>
        )}
        <span>ALTE AUFTRÄGE</span>
      </Menu.Item>
    </Menu>
  );
}
DashboardHelpSeekerMenu.propTypes = {
  mode: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  menuKey: PropTypes.string.isRequired,
  setMenuKey: PropTypes.func.isRequired,
};
export default DashboardHelpSeekerMenu;
