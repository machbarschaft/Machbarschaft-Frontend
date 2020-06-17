import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
    constructor(props) {
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
    }
    render() {
        if (!this.props.google) {
            return <div>Loading...</div>;
        }

        return (
            <Map
                 style={{width: "100%", height: "100%"}}
                 containerStyle={{position: "relative", width: "60vw", height: "calc(100vh - 6em - 3em - 7em)"}}
                 google={this.props.google}
                 zoom={10}
                 initialCenter={{
                    lat: 48.143831,
                    lng: 11.582340
                 }}
            >
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
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ""
})(MapContainer);
