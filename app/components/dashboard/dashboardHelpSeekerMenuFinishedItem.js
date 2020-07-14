import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import ClockIcon from '../../assets/img/clock-icon.svg';
import ClockIconWhite from '../../assets/img/clock-icon-white.svg';

export default function DashboardHelpSeekerMenuFinishedItem({ownKey, selectedKey, mode, title}) {
  return (
    <Menu.Item
      key={ownKey}
      className={
        mode == 'vertical' &&
        ("dashboard-menu-button" + (ownKey == "finished" ? " dashboard-menu-button-selected" : " dashboard-menu-button-default"))
      }
    >
      {mode == 'vertical' && (
        <div className="dashboard-menu-request-types">
          <img
            className="dashboard-menu-request-type-image"
            src={selectedKey == ownKey ? ClockIconWhite : ClockIcon}
          />
        </div>
      )}
      <span>{title}</span>
    </Menu.Item>
  );
}
DashboardHelpSeekerMenuFinishedItem.propTypes = {
  ownKey: PropTypes.any.isRequired,
  selectedKey: PropTypes.any.isRequired,
  mode: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  title: PropTypes.string.isRequired
}