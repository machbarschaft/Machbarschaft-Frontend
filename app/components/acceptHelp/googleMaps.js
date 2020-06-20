import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import locationPin from "../../assets/img/maps/location-pin.svg";
import RequestTypeGeneral from "../../assets/img/request-category/request-category-general.svg";
import RequestTypeGrocery from "../../assets/img/request-category/request-category-grocery.svg";
import RequestTypeMedicine from "../../assets/img/request-category/request-category-medicine.svg";

function Marker(props) {
    return (
        <div
            lat={props.lat}
            lng={props.lng}
            className={"map-place-container" + (props.$hover || props.hover ? " map-place-container-hover" : "")}
        >
            <img
                className="map-marker"
                onClick={() => props.onMarkerSelect()}
                onMouseEnter={() => props.onMarkerEnter()}
                onMouseLeave={() => props.onMarkerLeave()}
                src={locationPin}
            />
            {(props.$hover || props.hover || props.selected) && <Tooltip categories={props.categories} distance={props.distance} />}
        </div>
    );
}

function Tooltip(props) {
    let categoryTitle = "";
    if(props.categories.length == 0) categoryTitle = "Keine Kategorie angegeben";
        else categoryTitle = props.categories.length > 1 ? "Kategorien: " : "Kategorie: ";
    return (
        <div
            className="map-tooltip"
        >
            <div className="map-tooltip-info">
                <div>{categoryTitle}</div>
                <div className="display-flex map-tooltip-centered">
                    {props.categories.includes("grocery") && <img src={RequestTypeGrocery} />}
                    {props.categories.includes("medicine") && <img src={RequestTypeMedicine} />}
                    {props.categories.includes("general") && <img src={RequestTypeGeneral} />}
                </div>
                <div>Distanz:</div>
                <div className="map-tooltip-centered">{props.distance}</div>
            </div>
            <div className="map-tooltip-pointer"></div>
        </div>
    );
}

export default function MapContainer(props) {
    const [visible, setVisible] = React.useState(false);

    return (
        <div style={{ height: 'calc(100vh - 6em - 3em - 7em)', width: '60vw' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={{lat: 48.189280, lng: 11.564758}}
              defaultZoom={11}
              onClick={() => props.onMapClick()}
            >
                {props.markers.map((entry, index) => 
                    <Marker
                        lat={entry.lat}
                        lng={entry.lng}
                        onMarkerSelect={() => props.onMarkerSelect(index)}
                        selected={props.selectedMarkerIndex == index}
                        hover={props.hoverMarkerIndex == index}
                        onMarkerEnter={() => props.onMarkerEnter(index)}
                        onMarkerLeave={() => props.onMarkerLeave()}
                        categories={entry.categories}
                        distance={entry.distance}
                        key={index}
                    />
                )}
            </GoogleMapReact>
        </div>
    );
}
