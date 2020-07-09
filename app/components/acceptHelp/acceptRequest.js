import React from 'react';
import { Menu } from 'antd';
import MapContainer from './googleMaps';
import AcceptHelpSearchBar from './acceptHelpSearchBar';
import AcceptHelpListAndDetail from './acceptHelpListAndDetail';
import AcceptRequestListEntry from './acceptRequestListEntry';

export default function AcceptRequestWindow() {
  // Anmerkung: hier ist kein Reducer, da sich die states gegenseitig nicht beeinflussen
  // falls es ein Gegenargument gibt, bitte kommentieren :D
  const [selectedMarkerIndex, setSelectedMarkerIndex] = React.useState(-1);
  const [hoverMarkerIndex, setHoverMarkerIndex] = React.useState(-1);
  const [mobileMenuKey, setMobileMenuKey] = React.useState('map');
  const [currentLocation, setCurrentLocation] = React.useState({ lat: 0, lng: 0 });

  // test data, should be fetched from backend when endpoint is available
  const listEntries = [
    {
      request: {
        address: {
          street: 'Konradstraße',
          zipCode: '80801',
          city: 'München',
          geoLocation: {
            latitude: 48.189280,
            longitude: 11.564758,
          },
        },
        requestType: 'groceries',
        urgency: 'now',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      distance: '2,6km',
    }, {
      request: {
        address: {
          street: 'Konradstraße',
          zipCode: '80801',
          city: 'München',
          geoLocation: {
            latitude: 48.102401,
            longitude: 11.682987,
          },
        },
        requestType: 'medication',
        urgency: 'tomorrow',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      distance: '2,6km',
    }, {
      request: {
        address: {
          street: 'Konradstraße',
          zipCode: '80801',
          city: 'München',
          geoLocation: {
            latitude: 48.205928,
            longitude: 11.682987,
          },
        },
        requestType: 'other',
        urgency: 'today',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      distance: '2,6km',
    }, {
      request: {
        address: {
          street: 'Konradstraße',
          zipCode: '80801',
          city: 'München',
          geoLocation: {
            latitude: 48.113395,
            longitude: 11.613363,
          },
        },
        requestType: 'other',
        urgency: 'this-week',
        extras: {
          carNecessary: true,
          prescriptionRequired: false,
        },
      },
      distance: '2,6km',
    },
  ];

  const listEntriesRender = listEntries.map((entry, index) => (
    <React.Fragment key={index}>
      <AcceptRequestListEntry
        number={index + 1}
        {...entry}
        onClick={() => setSelectedMarkerIndex(index)}
        hover={hoverMarkerIndex == index}
        onMouseEnter={() => setHoverMarkerIndex(index)}
        onMouseLeave={() => setHoverMarkerIndex(-1)}
      />
      {(index < listEntries.length - 1) && <div className="accept-help-request-list-divider" />}
    </React.Fragment>
  ));
  const mapContainer = (
    <MapContainer
      markers={listEntries}
      selectedMarkerIndex={selectedMarkerIndex}
      onMarkerSelect={(index) => setSelectedMarkerIndex(index)}
      onMapClick={() => setSelectedMarkerIndex(-1)}
      hoverMarkerIndex={hoverMarkerIndex}
      onMarkerEnter={(index) => setHoverMarkerIndex(index)}
      onMarkerLeave={() => setHoverMarkerIndex(-1)}
      currentLocation={currentLocation}
    />
  );
  const acceptHelpListAndDetail = (
    <AcceptHelpListAndDetail
      selectedMarkerIndex={selectedMarkerIndex}
      setSelectedMarkerIndex={setSelectedMarkerIndex}
      listEntries={listEntries}
      listEntriesRender={listEntriesRender}
    />
  );
  const acceptHelpSearchBar = <AcceptHelpSearchBar setCurrentLocation={(pos) => setCurrentLocation(pos)} />;

  return (
    <>
      <div className="accept-help-container-desktop">
        {mapContainer}
        <div className="accept-help-right-bar">
          {acceptHelpSearchBar}
          {acceptHelpListAndDetail}
        </div>
      </div>

      <div className="accept-help-container-mobile">
        {acceptHelpSearchBar}
        <br />

        <Menu onClick={(e) => setMobileMenuKey(e.key)} selectedKeys={mobileMenuKey} mode="horizontal" style={{ textAlign: 'center' }}>
          <Menu.Item key="map">KARTE</Menu.Item>
          <Menu.Item key="list-and-detail">{selectedMarkerIndex == -1 ? 'LISTE' : 'DETAILS'}</Menu.Item>
        </Menu>
        <br />

        {mobileMenuKey == 'map' && mapContainer}
        {mobileMenuKey == 'list-and-detail' && acceptHelpListAndDetail}
      </div>
    </>
  );
}
