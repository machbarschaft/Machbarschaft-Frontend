import React from 'react';
import { Menu } from 'antd';
import { getOpenRequests } from '../../utils/api/acceptHelpApi';
import { ERROR, HOVER_INDEX, LOADING, MENU_KEY, SELECTED_INDEX, SUCCESS } from '../../contexts/acceptRequest/types';
import acceptRequestStateReducer from '../../contexts/acceptRequest/acceptRequestStateReducer';

const AcceptHelpSearchBar = React.lazy(() => import('../../components/acceptHelp/acceptHelpSearchBar'));
const AcceptHelpListAndDetail = React.lazy(() =>
  import('../../components/acceptHelp/acceptHelpListAndDetail')
);
const AcceptRequestListEntry = React.lazy(() =>
  import('../../components/acceptHelp/acceptRequestListEntry')
);
const MapContainer = React.lazy(() => import('../../components/acceptHelp/googleMaps'));

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
    if (currentLocation.lat !== 0 || currentLocation.lng !== 0) {
      dispatchAcceptRequestState({ type: LOADING });
      getOpenRequests({
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        radius: currentRadius,
      })
        .then((res) =>
          dispatchAcceptRequestState({ type: SUCCESS, requestList: res })
        )
        .catch((err) =>
          dispatchAcceptRequestState({ type: ERROR, error: err })
        );
    }
  }, [currentLocation]);

  const requestListRender = acceptRequestState.requestList.map(
    (entry, index) => (
      <React.Fragment key={index}>
        <AcceptRequestListEntry
          number={index + 1}
          {...entry}
          onClick={() =>
            dispatchAcceptRequestState({
              type: SELECTED_INDEX,
              selectedMarkerIndex: index,
            })
          }
          hover={acceptRequestState.hoverMarkerIndex === index}
          onMouseEnter={() =>
            dispatchAcceptRequestState({
              type: HOVER_INDEX,
              hoverMarkerIndex: index,
            })
          }
          onMouseLeave={() =>
            dispatchAcceptRequestState({
              type: HOVER_INDEX,
              hoverMarkerIndex: -1,
            })
          }
        />
        {index < acceptRequestState.requestList.length - 1 && (
          <div className="accept-help-request-list-divider" />
        )}
      </React.Fragment>
    )
  );
  const mapContainer = (
    <MapContainer
      markers={acceptRequestState.requestList}
      selectedMarkerIndex={acceptRequestState.selectedMarkerIndex}
      onMarkerSelect={(index) =>
        dispatchAcceptRequestState({
          type: SELECTED_INDEX,
          selectedMarkerIndex: index,
        })
      }
      onMapClick={() =>
        dispatchAcceptRequestState({
          type: SELECTED_INDEX,
          selectedMarkerIndex: -1,
        })
      }
      hoverMarkerIndex={acceptRequestState.hoverMarkerIndex}
      onMarkerEnter={(index) =>
        dispatchAcceptRequestState({
          type: HOVER_INDEX,
          hoverMarkerIndex: index,
        })
      }
      onMarkerLeave={() =>
        dispatchAcceptRequestState({
          type: HOVER_INDEX,
          hoverMarkerIndex: -1,
        })
      }
      currentLocation={currentLocation}
    />
  );
  const acceptHelpListAndDetail = (
    <AcceptHelpListAndDetail
      selectedMarkerIndex={acceptRequestState.selectedMarkerIndex}
      setSelectedMarkerIndex={(index) =>
        dispatchAcceptRequestState({
          type: SELECTED_INDEX,
          selectedMarkerIndex: index,
        })
      }
      listEntries={acceptRequestState.requestList}
      listEntriesRender={requestListRender}
      showNoRequestWarning={
        currentLocation.lat !== 0 || currentLocation.lng !== 0
      }
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
          onClick={(e) =>
            dispatchAcceptRequestState({
              type: MENU_KEY,
              mobileMenuKey: e.key,
            })
          }
          selectedKeys={acceptRequestState.mobileMenuKey}
          mode="horizontal"
          style={{ textAlign: 'center' }}
        >
          <Menu.Item key="map">KARTE</Menu.Item>
          <Menu.Item key="list-and-detail">
            {acceptRequestState.selectedMarkerIndex === -1
              ? 'LISTE'
              : 'DETAILS'}
          </Menu.Item>
        </Menu>
        <br />

        {acceptRequestState.mobileMenuKey === 'map' && mapContainer}
        {acceptRequestState.mobileMenuKey === 'list-and-detail' &&
          acceptHelpListAndDetail}
      </div>
    </>
  );
}
