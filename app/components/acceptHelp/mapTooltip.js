import React from "react";
import PropTypes from "prop-types";
import RequestTypeGeneral from "../../assets/img/request-category/request-category-general.svg";
import RequestTypeGrocery from "../../assets/img/request-category/request-category-grocery.svg";
import RequestTypeMedicine from "../../assets/img/request-category/request-category-medicine.svg";

export default function MapTooltip({categories, distance}) {
    let categoryTitle = "";
    if(categories.length == 0) categoryTitle = "Keine Kategorie angegeben";
        else categoryTitle = categories.length > 1 ? "Kategorien: " : "Kategorie: ";
    return (
        <div
            className="map-tooltip"
        >
            <div className="map-tooltip-info">
                <div>{categoryTitle}</div>
                <div className="display-flex map-tooltip-centered">
                    {categories.includes("grocery") && <img src={RequestTypeGrocery} />}
                    {categories.includes("medicine") && <img src={RequestTypeMedicine} />}
                    {categories.includes("general") && <img src={RequestTypeGeneral} />}
                </div>
                <div>Distanz:</div>
                <div className="map-tooltip-centered">{distance}</div>
            </div>
            <div className="map-tooltip-pointer"></div>
        </div>
    );
}
MapTooltip.propTypes = {
    categories: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired
};