import React from 'react';

function geolocationStateReducer(state, action) {
    if(action.type === "start") {
        return {
            ...state,
            running: true,
            success: false,
            error: null,
            used: true,
            location: null
        };
    } else if(action.type === "success") {
        return {
            ...state,
            running: false,
            success: true,
            error: null,
            location: action.location
        }
    } else if(action.type === "error") {
        return {
            ...state,
            running: false,
            success: false,
            error: action.error,
            location: null
        };
    }
    else {
        throw new Error("Unsupported");
    }
}


export default function useGeolocation(setLocation) {
    const [geolocationState, dispatchGeolocationState] = React.useReducer(
        geolocationStateReducer,
        {
            running: false,
            success: false,
            error: null,
            used: false,
            location: null
        }
    );
    React.useEffect(() => {
        if(geolocationState.running) {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        setLocation(pos);
                        dispatchGeolocationState({type: "success", position: pos});
                    },
                    (error) => dispatchGeolocationState({type: "error", error: error})
                );
            }
                else dispatchGeolocationState({type: "error", error: "NOT_SUPPORTED"});
        }
    }, [geolocationState.running]);

    const startGeolocation = () => dispatchGeolocationState({type: "start"});

    return [geolocationState, startGeolocation];
}
