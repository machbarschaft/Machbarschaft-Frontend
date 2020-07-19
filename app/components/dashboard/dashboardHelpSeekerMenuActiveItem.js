import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import RequestTypeOther from '../../assets/img/request-category/request-category-other.svg';
import RequestTypeGroceries from '../../assets/img/request-category/request-category-groceries.svg';
import RequestTypeMedication from '../../assets/img/request-category/request-category-medication.svg';
import RequestTypeOtherWhite from '../../assets/img/request-category/request-category-other-white.svg';
import RequestTypeGroceriesWhite from '../../assets/img/request-category/request-category-groceries-white.svg';
import RequestTypeMedicationWhite from '../../assets/img/request-category/request-category-medication-white.svg';

export default function dashboardHelpSeekerMenuActiveItem({
  ownKey,
  selectedKey,
  mode,
  requestType,
  title,
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

  return (
    <Menu.Item
      key={ownKey}
      className={
        mode === 'vertical' &&
        `dashboard-menu-button${
          selectedKey === ownKey
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
              selectedKey === ownKey
                ? requestTypeImagesWhite[requestType]
                : requestTypeImages[requestType]
            }
            alt="request-type"
          />
        </div>
      )}
      <span>{title}</span>
    </Menu.Item>
  );
}
dashboardHelpSeekerMenuActiveItem.propTypes = {
  ownKey: PropTypes.any.isRequired,
  selectedKey: PropTypes.any.isRequired,
  mode: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
  title: PropTypes.string.isRequired,
};
