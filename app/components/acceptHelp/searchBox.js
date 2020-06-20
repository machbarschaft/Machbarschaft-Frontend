import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

export default function SearchBox({placeholder, onPlacesChanged}) {
    var placesHandle = null;
    const inputEl = React.useRef(null);

    function placesChanged() {
        if(placesHandle !== null) {
            const places = placesHandle.getPlaces();
            if(places !== undefined && places.length > 0) inputEl.current.value = places[0].formatted_address;
            onPlacesChanged(places);
        }
    }
    React.useEffect(() => {
        placesHandle = new google.maps.places.SearchBox(inputEl.current);
        placesHandle.addListener("places_changed", placesChanged);
        return function cleanup() {
            google.maps.event.clearInstanceListeners(placesHandle);
        }
    });
    return (
        <>
            <input className="accept-help-search-input" ref={inputEl} placeholder={placeholder} type="text"/>
            <Button shape="circle" icon={<SearchOutlined />} onClick={() => placesChanged()} />  
        </>
    );
}