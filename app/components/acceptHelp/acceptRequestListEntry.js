import React from "react";
import PropTypes from "prop-types";
import RequestTypeOther from "../../assets/img/request-category/request-category-other.svg";
import RequestTypeGroceries from "../../assets/img/request-category/request-category-groceries.svg";
import RequestTypeMedication from "../../assets/img/request-category/request-category-medication.svg";

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
                    <img src={RequestTypeGroceries} className={request.requestType.includes("groceries") ? "" : "visibility-hidden"} />
                    <img src={RequestTypeMedication} className={request.requestType.includes("medication") ? "" : "visibility-hidden"} />
                    <img src={RequestTypeOther} className={request.requestType.includes("other") ? "" : "visibility-hidden"} />
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