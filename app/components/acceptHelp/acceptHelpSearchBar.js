import React from 'react';
import PropTypes from 'prop-types';
import { Select, notification } from 'antd';
import geolocationFixed from '../../assets/img/maps/geolocation-fixed.svg';
import geolocationNotFixed from '../../assets/img/maps/geolocation-not-fixed.svg';
import useGeolocation from '../../hooks/useGeolocation';
import SearchBox from './searchBox';

export default function AcceptHelpSearchBar({
  loading,
  setCurrentLocation,
  setCurrentRadius,
}) {
  const [geolocationState, startGeolocation] = useGeolocation((pos) =>
    setCurrentLocation(pos)
  );

  React.useEffect(() => {
    if (geolocationState.error != null) {
      if (geolocationState.error === 'NOT_SUPPORTED')
        notification.error({
          message: 'Fehler',
          description:
            'Dein Browsers unterstützt die Standortermittlung leider nicht!',
        });
      else if (typeof geolocationState.error.code !== 'undefined') {
        if (
          geolocationState.error.code ===
          geolocationState.error.PERMISSION_DENIED
        )
          notification.error({
            message: 'Fehler',
            description:
              'Bitte erlaube die Standortermittlung in deinem Browser!',
          });
        else {
          notification.error({
            message: 'Fehler',
            description: 'Dein Standort konnte nicht ermittelt werden!',
          });
        }
      } else {
        notification.error({
          message: 'Fehler',
          description: 'Dein Standort konnte nicht ermittelt werden!',
        });
      }
    }
  }, [geolocationState.error]);

  return (
    <div className="accept-help-search-bar">
      <SearchBox
        placeholder="Adresse eingeben"
        onPlacesChanged={(pos) => {
          if (pos != null) {
            setCurrentLocation(pos);
          } else {
            setCurrentLocation(0, 0);
          }
        }}
        loading={loading}
      />
      <img
        src={geolocationState.success ? geolocationFixed : geolocationNotFixed}
        className={`accept-help-geolocation-icon${
          geolocationState.running
            ? ' accept-help-geolocation-icon-running'
            : ''
        }`}
        onClick={() => startGeolocation()}
        alt="geolocation-icon"
      />
      <Select
        defaultValue={25000}
        bordered={false}
        onChange={(value) => setCurrentRadius(value)}
      >
        <Select.Option value={5000}>5km</Select.Option>
        <Select.Option value={10000}>10km</Select.Option>
        <Select.Option value={15000}>15km</Select.Option>
        <Select.Option value={25000}>25km</Select.Option>
        <Select.Option value={50000}>50km</Select.Option>
        <Select.Option value={70000}>70km</Select.Option>
      </Select>
    </div>
  );
}
AcceptHelpSearchBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
  setCurrentRadius: PropTypes.func.isRequired,
};
