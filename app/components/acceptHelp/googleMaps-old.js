import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

function mapStateReducer(state, action) {
    if(action.type === "mouseover") {
        return {
            ...state,
            showTooltip: true,
            activeMarker: action.marker,
            tooltipContent: "Testcontent"
        };
    } else if(action.type === "mouseout") {
        return {
            ...state,
            showTooltip: false,
            activeMarker: null,
            tooltipContent: null
        }
    }
    else {
        throw new Error("Unsupported");
    }
} 

export function MapContainer(props) {
    const [mapState, dispatchMapState] = React.useReducer(
        mapStateReducer,
        {
            showTooltip: false,
            activeMarker: null,
            tooltipContent: null
        }
    );
    /*constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }
    onMarkerClick(props, marker, e) {
            this.setState({
                    selectedPlace: props,
                    activeMarker: marker,
                    showingInfoWindow: true
            });
    }*/
    if (!props.google) {
        return <div>Loading...</div>;
    }
        /*
        <Marker
            name={'SOMA'}
            onClick={this.onMarkerClick}
            position={{lat: 48.189280, lng: 11.564758}} />
        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            style={{width: "5em", height: "10em", border: "3px solid red"}}>
                <div style={{width: "5em", height: "10em", border: "3px solid green"}}>
                    <h1>{this.state.selectedPlace.name}</h1>
                </div>
        </InfoWindow>
        */
        /*const markersRender = this.props.markers.map((entry, index) => 
            <>
                <Marker
                    name={'SOMA'}
                    position={{lat: entry.lat, lng: entry.lon}}
                    key={index}
                />
            </>
        );*/

    return (
        <Map
            style={{width: "100%", height: "100%"}}
            containerStyle={{position: "relative", width: "60vw", height: "calc(100vh - 6em - 3em - 7em)"}}
            google={props.google}
            zoom={10}
            onMousemove={() => console.log("move")}
            initialCenter={{
                lat: 48.143831,
                lng: 11.582340
            }}>

            {props.markers.map((entry, index) => 
                <Marker
                    key={index}
                    title={entry.name}
                    name={entry.name}
                    position={{ lat: entry.lat, lng: entry.lon }}
                    onMouseover={(props, marker, e) => dispatchMapState({type: "mouseover", marker: marker})}
                    onMouseout={(props, marker, e) => dispatchMapState({type: "mouseout"})}
                />
            )}
            <InfoWindow
                marker={mapState.activeMarker}
                visible={mapState.showTooltip}>
                <div>
                    <h1>{mapState.tooltipContent}</h1>
                </div>
            </InfoWindow>

        </Map>
    );
}
export default GoogleApiWrapper({
    apiKey: ""
})(MapContainer);
