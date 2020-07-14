import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import ClockIcon from '../../assets/img/clock-icon.svg';
import ClockIconWhite from '../../assets/img/clock-icon-white.svg';

export default function DashboardHelpSeekerMenuFinishedItem({key, selectedKey, title}) {
  return (
    <Menu.Item
      key={key}
      className={
        mode == 'vertical' &&
        ("dashboard-menu-button" + (key == "finished" ? " dashboard-menu-button-selected" : " dashboard-menu-button-default"))
      }
    >
      {mode == 'vertical' && (
        <div className="dashboard-menu-request-types">
          <img
            className="dashboard-menu-request-type-image"
            src={selectedKey == key ? ClockIconWhite : ClockIcon}
          />
        </div>
      )}
      <span>{title}</span>
    </Menu.Item>
  );
}
DashboardHelpSeekerMenuFinishedItem.propTypes = {
  key: PropTypes.any.isRequired,
  selectedKey: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
}