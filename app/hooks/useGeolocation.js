import React from 'react';
import geolocationStateReducer from '../contexts/geolocation/geolocationStateReducer';
import { ERROR, START, SUCCESS } from '../contexts/geolocation/types';

export default function useGeolocation(setLocation) {
  const [geolocationState, dispatchGeolocationState] = React.useReducer(
    geolocationStateReducer,
    {
      running: false,
      success: false,
      error: null,
      used: false,
      location: null,
    }
  );
  React.useEffect(() => {
    if (geolocationState.running) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(pos);
            dispatchGeolocationState({ type: SUCCESS, position: pos });
          },
          (error) => dispatchGeolocationState({ type: ERROR, error })
        );
      } else
        dispatchGeolocationState({ type: ERROR, error: 'NOT_SUPPORTED' });
    }
  }, [geolocationState.running]);

  const startGeolocation = () => dispatchGeolocationState({ type: START });

  return [geolocationState, startGeolocation];
}
