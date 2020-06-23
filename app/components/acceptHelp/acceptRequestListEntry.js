import React from "react";
import PropTypes from "prop-types";
import RequestTypeGeneral from "../../assets/img/request-category/request-category-general.svg";
import RequestTypeGrocery from "../../assets/img/request-category/request-category-grocery.svg";
import RequestTypeMedicine from "../../assets/img/request-category/request-category-medicine.svg";

export default function AcceptRequestListEntry({number, address, distance, categories, hover, onClick, onMouseEnter, onMouseLeave}) {
    return (
        <div
            className={"accept-help-request-list-entry" + (hover ? " accept-help-request-list-entry-hover":"")}
            onClick={() => onClick()}
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
        >
                <div className="accept-help-request-list-entry-number">{number}</div>
                <div className="accept-help-request-list-entry-address">{address}</div>
                <div className="accept-help-request-list-entry-category">
                    <img src={RequestTypeGrocery} className={categories.includes("grocery") ? "" : "visibility-hidden"} />
                    <img src={RequestTypeMedicine} className={categories.includes("medicine") ? "" : "visibility-hidden"} />
                    <img src={RequestTypeGeneral} className={categories.includes("general") ? "" : "visibility-hidden"} />
                </div>
                <div className="accept-help-request-list-entry-distance">{distance}</div>
        </div>  
    );
}
AcceptRequestListEntry.propTypes = {
    number: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    hover: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
};