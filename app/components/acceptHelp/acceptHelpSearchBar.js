import React from 'react';
import PropTypes from 'prop-types';
import { Select, message } from 'antd';
import geolocationFixed from '../../assets/img/maps/geolocation-fixed.svg';
import geolocationNotFixed from '../../assets/img/maps/geolocation-not-fixed.svg';
import useGeolocation from '../../hooks/useGeolocation';
import SearchBox from './searchBox';

export default function AcceptHelpSearchBar({ setCurrentLocation }) {
  const [geolocationState, startGeolocation] = useGeolocation((pos) => setCurrentLocation(pos));

  React.useEffect(() => {
    if (geolocationState.error != null) {
      if (geolocationState.error === 'NOT_SUPPORTED') message.error('Dein Browsers unterstützt die Standortermittlung leider nicht!');
      else if (typeof geolocationState.error.code !== undefined) {
        if (geolocationState.error.code === geolocationState.error.PERMISSION_DENIED) message.error('Bitte erlaube die Standortermittlung in deinem Browser!');
        else message.error('Dein Standort konnte nicht ermittelt werden!');
      } else message.error('Dein Standort konnte nicht ermittelt werden!');
    }
  }, [geolocationState.error]);

  return (
    <div className="accept-help-search-bar">
      <SearchBox
        placeholder="Adresse eingeben"
        onPlacesChanged={(pos) => {
          if (pos != null) setCurrentLocation(pos);
          else setCurrentLocation(0, 0);
        }}
      />
      <img
        src={geolocationState.success ? geolocationFixed : geolocationNotFixed}
        className={`accept-help-geolocation-icon${geolocationState.running ? ' accept-help-geolocation-icon-running' : ''}`}
        onClick={() => startGeolocation()}
      />
      <Select defaultValue="25" bordered={false} onChange={(value) => console.log(`selected ${value}`)}>
        <Select.Option value="5">5km</Select.Option>
        <Select.Option value="10">10km</Select.Option>
        <Select.Option value="15">15km</Select.Option>
        <Select.Option value="25">25km</Select.Option>
        <Select.Option value="50">50km</Select.Option>
        <Select.Option value="70">70km</Select.Option>
      </Select>
    </div>
  );
}
AcceptHelpSearchBar.propTypes = {
  setCurrentLocation: PropTypes.func.isRequired,
};
