import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchBox({ placeholder, onPlacesChanged }) {
  let placesHandle = null;
  const inputEl = React.useRef(null);

  function processPlaces(places) {
    if (places.length > 0) {
      inputEl.current.value = places[0].formatted_address;
      onPlacesChanged({ lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() });
    } else onPlacesChanged(null);
  }

  function placesChanged() {
    processPlaces(placesHandle.getPlaces());
  }

  function searchButtonClicked() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: inputEl.current.value }, (result) => processPlaces(result));
  }

  React.useEffect(() => {
    placesHandle = new google.maps.places.SearchBox(inputEl.current);
    placesHandle.addListener('places_changed', placesChanged);
    return google.maps.event.clearInstanceListeners(placesHandle);
  });
  return (
    <>
      <input className="accept-help-search-input" ref={inputEl} placeholder={placeholder} type="text" />
      <Button shape="circle" icon={<SearchOutlined />} onClick={() => searchButtonClicked()} />
    </>
  );
}
SearchBox.propTypes = {
  placesHolder: PropTypes.string,
  onPlacesChanged: PropTypes.func.isRequired,
};
