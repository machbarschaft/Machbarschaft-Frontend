import React from 'react';
import CurrentLocationImg from '../../assets/img/maps/current-location.svg';

export default function CurrentLocationMarker() {
  return <img className="map-current-location" src={CurrentLocationImg} alt="" />;
}
