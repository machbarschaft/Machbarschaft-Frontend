import React from "react";
import PropTypes from "prop-types";
import RequestTypeGeneral from "../../assets/img/request-category/request-category-general.svg";
import RequestTypeGrocery from "../../assets/img/request-category/request-category-grocery.svg";
import RequestTypeMedicine from "../../assets/img/request-category/request-category-medicine.svg";

export default function AcceptRequestListEntry({request, distance, hover, onClick, onMouseEnter, onMouseLeave}) {
    return (
        <div
            className={"accept-help-request-list-entry" + (hover ? " accept-help-request-list-entry-hover":"")}
            onClick={() => onClick()}
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
        >
                <div className="accept-help-request-list-entry-number">{request.number}</div>
                <div className="accept-help-request-list-entry-address">
                    {request.address.street}, {request.address.zipCode} {request.address.city}
                </div>
                <div className="accept-help-request-list-entry-category">
                    <img src={RequestTypeGrocery} className={request.requestType.includes("grocery") ? "" : "visibility-hidden"} />
                    <img src={RequestTypeMedicine} className={request.requestType.includes("medicine") ? "" : "visibility-hidden"} />
                    <img src={RequestTypeGeneral} className={request.requestType.includes("general") ? "" : "visibility-hidden"} />
                </div>
                <div className="accept-help-request-list-entry-distance">{distance}</div>
        </div>  
    );
}
AcceptRequestListEntry.propTypes = {
    request: PropTypes.object.isRequired,
    distance: PropTypes.string.isRequired,
    hover: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
};