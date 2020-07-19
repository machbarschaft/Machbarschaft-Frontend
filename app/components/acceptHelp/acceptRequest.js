import React from 'react';
import { Menu, Button } from 'antd';
import MapContainer from './googleMaps';
import AcceptHelpSearchBar from './acceptHelpSearchBar';
import AcceptHelpListAndDetail from './acceptHelpListAndDetail';
import AcceptRequestListEntry from './acceptRequestListEntry';
import { getOpenRequests } from '../../utils/api/acceptHelpApi';

function acceptRequestStateReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      selectedMarkerIndex: -1,
      hoverMarkerIndex: -1,
      mobileMenuKey: 'map',
      loading: false,
      requestList: action.requestList,
      error: null
    };
  }
  if (action.type === 'error') {
    return {
      ...state,
      selectedMarkerIndex: -1,
      hoverMarkerIndex: -1,
      mobileMenuKey: 'map',
      loading: false,
      requestList: [],
      error: action.error
    };
  }
  if (action.type === 'loading') {
    return {
      ...state,
      loading: true,
      error: null
    };
  }
  if (action.type === 'selected-index') {
    return {
      ...state,
      selectedMarkerIndex: action.selectedMarkerIndex
    }
  }
  if (action.type === 'hover-index') {
    return {
      ...state,
      hoverMarkerIndex: action.hoverMarkerIndex
    }
  }
  if (action.type === 'menu-key') {
    return {
      ...state,
      mobileMenuKey: action.mobileMenuKey
    }
  }
  throw new Error('Unsupported');
}

export default function AcceptRequestWindow() {
  const [currentLocation, setCurrentLocation] = React.useState({
    lat: 0,
    lng: 0,
  });
  const [currentRadius, setCurrentRadius] = React.useState(25000);
  const [acceptRequestState, dispatchAcceptRequestState] = React.useReducer(
    acceptRequestStateReducer,
    {
      selectedMarkerIndex: -1,
      hoverMarkerIndex: -1,
      mobileMenuKey: 'map',
      loading: false,
      requestList: [],
      error: null,
    }
  );


  React.useEffect(() => {
    if(currentLocation.lat !== 0 || currentLocation.lng !== 0) {
      dispatchAcceptRequestState({type: 'loading'});
      getOpenRequests({
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        radius: currentRadius
      })
          .then((res) => dispatchAcceptRequestState({type: 'success', requestList: res}))
          .catch((err) => dispatchAcceptRequestState({type: 'error', error: err}));
    }
  }, [currentLocation]);
      
  const requestListRender = acceptRequestState.requestList.map((entry, index) => (
    <React.Fragment key={index}>
      <AcceptRequestListEntry
        number={index + 1}
        {...entry}
        onClick={() => dispatchAcceptRequestState({type: 'selected-index', selectedMarkerIndex: index})}
        hover={acceptRequestState.hoverMarkerIndex == index}
        onMouseEnter={() => dispatchAcceptRequestState({type: 'hover-index', hoverMarkerIndex: index})}
        onMouseLeave={() => dispatchAcceptRequestState({type: 'hover-index', hoverMarkerIndex: -1})}
      />
      {index < acceptRequestState.requestList.length - 1 && (
        <div className="accept-help-request-list-divider" />
      )}
    </React.Fragment>
  ));
  const mapContainer = (
    <MapContainer
      markers={acceptRequestState.requestList}
      selectedMarkerIndex={acceptRequestState.selectedMarkerIndex}
      onMarkerSelect={(index) => dispatchAcceptRequestState({type: 'selected-index', selectedMarkerIndex: index})}
      onMapClick={() => dispatchAcceptRequestState({type: 'selected-index', selectedMarkerIndex: -1})}
      hoverMarkerIndex={acceptRequestState.hoverMarkerIndex}
      onMarkerEnter={(index) => dispatchAcceptRequestState({type: 'hover-index', hoverMarkerIndex: index})}
      onMarkerLeave={() => dispatchAcceptRequestState({type: 'hover-index', hoverMarkerIndex: -1})}
      currentLocation={currentLocation}
    />
  );
  const acceptHelpListAndDetail = (
    <AcceptHelpListAndDetail
      selectedMarkerIndex={acceptRequestState.selectedMarkerIndex}
      setSelectedMarkerIndex={(index) => dispatchAcceptRequestState({type: 'selected-index', selectedMarkerIndex: index})}
      listEntries={acceptRequestState.requestList}
      listEntriesRender={requestListRender}
      showNoRequestWarning={currentLocation.lat != 0 || currentLocation.lng != 0}
      error={acceptRequestState.error}
    />
  );
  const acceptHelpSearchBar = (
    <AcceptHelpSearchBar
      setCurrentLocation={(pos) => setCurrentLocation(pos)}
      setCurrentRadius={(radius) => setCurrentRadius(radius)}
      loading={acceptRequestState.loading}
    />
  );

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

        <Menu
          onClick={(e) => dispatchAcceptRequestState({type: 'menu-key', mobileMenuKey: e.key})}
          selectedKeys={acceptRequestState.mobileMenuKey}
          mode="horizontal"
          style={{ textAlign: 'center' }}
        >
          <Menu.Item key="map">KARTE</Menu.Item>
          <Menu.Item key="list-and-detail">
            {acceptRequestState.selectedMarkerIndex === -1 ? 'LISTE' : 'DETAILS'}
          </Menu.Item>
        </Menu>
        <br />

        {acceptRequestState.mobileMenuKey === 'map' && mapContainer}
        {acceptRequestState.mobileMenuKey === 'list-and-detail' && acceptHelpListAndDetail}
      </div>
    </>
  );
}
