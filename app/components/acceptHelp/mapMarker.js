import React from "react";
import PropTypes from "prop-types";
import PlacePin from "../../assets/img/maps/place-pin.svg";
import MapTooltip from "./mapTooltip";

export default function MapMarker({request, distance, hover, selected, onMarkerSelect, onMarkerEnter, onMarkerLeave, $hover}) {
    return (
        <div
            className={"map-place-container" + ($hover || hover ? " map-place-container-hover" : "")}
        >
            <img
                className="map-marker"
                onClick={() => onMarkerSelect()}
                onMouseEnter={() => onMarkerEnter()}
                onMouseLeave={() => onMarkerLeave()}
                src={PlacePin}
            />
            {($hover || hover || selected) && <MapTooltip categories={request.requestType} distance={distance}/>}
        </div>
    );
}
MapMarker.propTypes = {
    request: PropTypes.object.isRequired,
    distance: PropTypes.string.isRequired,
    hover: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    onMarkerSelect: PropTypes.func.isRequired,
    onMarkerEnter: PropTypes.func.isRequired,
    onMarkerLeave: PropTypes.func.isRequired
};