import React from 'react';
import PropTypes from 'prop-types';
import RequestTypeOther from '../../assets/img/request-category/request-category-other.svg';
import RequestTypeGroceries from '../../assets/img/request-category/request-category-groceries.svg';
import RequestTypeMedication from '../../assets/img/request-category/request-category-medication.svg';

export default function MapTooltip({ categories, distance }) {
  let categoryTitle = '';
  if (categories.length === 0) categoryTitle = 'Keine Kategorie angegeben';
  else categoryTitle = categories.length > 1 ? 'Kategorien: ' : 'Kategorie: ';
  return (
    <div className="map-tooltip">
      <div className="map-tooltip-info">
        <div>{categoryTitle}</div>
        <div className="display-flex map-tooltip-centered">
          {categories.includes('groceries') && (
            <img src={RequestTypeGroceries} alt="groceries-icon" />
          )}
          {categories.includes('medication') && (
            <img src={RequestTypeMedication} alt="medication-icon" />
          )}
          {categories.includes('other') && (
            <img src={RequestTypeOther} alt="other-icon" />
          )}
        </div>
        <div>Distanz:</div>
        <div className="map-tooltip-centered">
          {(distance / 1000).toFixed(1).replace('.', ',')}km
        </div>
      </div>
      <div className="map-tooltip-pointer" />
    </div>
  );
}
MapTooltip.propTypes = {
  categories: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
};
