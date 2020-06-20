import React from "react";
import ReactDOM from "react-dom";
import {Input, Select, Button} from 'antd';
import MapContainer from "./googleMaps";
import {SearchOutlined} from '@ant-design/icons';
import RequestTypeGeneral from "../../assets/img/request-category/request-category-general.svg";
import RequestTypeGrocery from "../../assets/img/request-category/request-category-grocery.svg";
import RequestTypeMedicine from "../../assets/img/request-category/request-category-medicine.svg";
import ArrowLeft from "../../assets/img/navigation/arrow-left.svg";
import CarRequired from "../../assets/img/request-requirements/car-required.svg";
import CarNotRequired from "../../assets/img/request-requirements/car-not-required.svg";
import PrescriptionRequired from "../../assets/img/request-requirements/prescription-required.svg";
import PrescriptionNotRequired from "../../assets/img/request-requirements/prescription-not-required.svg";
import SearchBox from "./searchBox";

function mapStateReducer(state, action) {
    if(action.type === "mouseover") {
        return {
            ...state,
            showTooltip: true,
            activeMarker: action.marker,
            tooltipContent: "Testcontent"
        };
    } else if(action.type === "mouseout") {
        return {
            ...state,
            showTooltip: false,
            activeMarker: null,
            tooltipContent: null
        }
    }
    else {
        throw new Error("Unsupported");
    }
}

function AcceptRequestDetailView({address, distance, categories, urgency, carrequired, prescriptionrequired, closeDetailView}) {
    let categoryTitle = "";
    if(categories.length == 0) categoryTitle = "Keine Kategorie angegeben";
        else categoryTitle = categories.length > 1 ? "Kategorien: " : "Kategorie: ";

    return (
        <div className="accept-help-request-detail">
            <div className="accept-help-request-detail-header">
                <div className="accept-help-request-detail-back">
                    <img src={ArrowLeft} onClick={() => closeDetailView()} />
                </div>
                <div className="accept-help-request-detail-title">{address}</div>
            </div>
            <div className="accept-help-request-detail-main">
                <div className="accept-help-request-detail-info">
                    <div className="font-weight-bold">{categoryTitle}</div>
                    <div className="display-flex">
                        {categories.includes("grocery") && <img className="accept-help-request-detail-icon" src={RequestTypeGrocery} />}
                        {categories.includes("medicine") && <img className="accept-help-request-detail-icon" src={RequestTypeMedicine} />}
                        {categories.includes("general") && <img className="accept-help-request-detail-icon" src={RequestTypeGeneral} />}
                    </div>
                    <div className="font-weight-bold">Distanz:</div><div>{distance}</div>
                    <div className="font-weight-bold">Dringlichkeit:</div><div>{urgency}</div>
                    <div className="font-weight-bold">Auto benötigt:</div>
                    <img className="accept-help-request-detail-icon" src={carrequired ? CarRequired : CarNotRequired} />
                    <div className="font-weight-bold">Rezept benötigt:</div>
                    <img className="accept-help-request-detail-icon" src={prescriptionrequired ? PrescriptionRequired : PrescriptionNotRequired} />
                </div>
            </div>
            <div className="horizontal-center">
                <Button className="accept-help-request-detail-button" type="primary">Auftrag annehmen</Button>
            </div>
        </div>
    );
}

function AcceptRequestListEntry({number, address, distance, categories, hover, onClick, onMouseEnter, onMouseLeave}) {
    return (
        <div
            className={"accept-help-request-list-entry" + (hover ? " accept-help-request-list-entry-hover":"")}
            onClick={() => onClick()}
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
        >
                <div className="accept-help-request-list-entry-number">{number}</div>
                <div className="accept-help-request-list-entry-address">{address}</div>
                <div className="accept-help-request-list-entry-category">
                    <img src={RequestTypeGrocery} className={categories.includes("grocery") ? "" : "visibility-hidden"} />
                    <img src={RequestTypeMedicine} className={categories.includes("medicine") ? "" : "visibility-hidden"} />
                    <img src={RequestTypeGeneral} className={categories.includes("general") ? "" : "visibility-hidden"} />
                </div>
                <div className="accept-help-request-list-entry-distance">{distance}</div>
        </div>  
    );
}

function AcceptRequestWindow() {
    //const [mapRender, setMapRender] = React.useState("");

    //React.useEffect(() => setMapRender(<MapContainer />));
    /*
    */
    /*const [mapState, dispatchMapState] = React.useReducer(
        mapStateReducer,
        {
            selectedIndex: -1
        }
    );*/
    const [selectedMarkerIndex, setSelectedMarkerIndex] = React.useState(-1);
    const [hoverMarkerIndex, setHoverMarkerIndex] = React.useState(-1);
    const listEntries = [
        {
            address: "Konradstraße, 80801 München",
            distance: "2,6km",
            categories: ["general"],
            lat: 48.189280,
            lng: 11.564758,
            urgency: "sehr dringend",
            carrequired: true,
            reciperequired: false
        },{
            address: "Konradstraße, 80801 München",
            distance: "2,6km",
            categories: ["general", "medicine"],
            lat: 48.102401,
            lng:11.682987,
            urgency: "sehr dringend",
            carrequired: true,
            reciperequired: false
        },{
            address: "Konradstraße, 80801 München",
            distance: "2,6km",
            categories: ["general", "medicine"],
            lat: 48.205928,
            lng: 11.682987,
            urgency: "sehr dringend",
            carrequired: true,
            reciperequired: false
        },{
            address: "Konradstraße, 80801 München",
            distance: "2,6km",
            categories: ["general", "medicine"],
            lat: 48.113395,
            lng: 11.613363,
            urgency: "sehr dringend",
            carrequired: true,
            reciperequired: false
        }
    ];
    const listEntriesRender = listEntries.map((entry, index) => 
        <React.Fragment key={index}>
            <AcceptRequestListEntry
                number={index+1}
                {...entry}
                onClick={() => setSelectedMarkerIndex(index)}
                hover={hoverMarkerIndex == index}
                onMouseEnter={() => setHoverMarkerIndex(index)}
                onMouseLeave={() => setHoverMarkerIndex(-1)}
            />
            {(index < listEntries.length-1) && <div className="accept-help-request-list-divider"></div>}
        </React.Fragment>
    );

    return (
        <>
            <div className="accept-help-container">
                <MapContainer
                    markers={listEntries}
                    selectedMarkerIndex={selectedMarkerIndex}
                    onMarkerSelect={(index) => setSelectedMarkerIndex(index)}
                    onMapClick={() => setSelectedMarkerIndex(-1)}
                    hoverMarkerIndex={hoverMarkerIndex}
                    onMarkerEnter={(index) => setHoverMarkerIndex(index)}
                    onMarkerLeave={() => setHoverMarkerIndex(-1)}
                />
                <div className="accept-help-right-bar">
                    <div className="accept-help-search-bar">
                        <SearchBox placeholder="Adresse eingeben" onPlacesChanged={(places) => console.log("places: ", places)} />
                        <Select defaultValue="25" bordered={false} onChange={(value) => console.log(`selected ${value}`)}>
                            <Select.Option value="5">5km</Select.Option>
                            <Select.Option value="10">10km</Select.Option>
                            <Select.Option value="15">15km</Select.Option>
                            <Select.Option value="25">25km</Select.Option>
                            <Select.Option value="50">50km</Select.Option>
                            <Select.Option value="70">70km</Select.Option>
                        </Select>
                    </div>
                    {selectedMarkerIndex < 0 ?
                        <div className="accept-help-request-list">
                            {listEntriesRender}
                        </div>
                        :<AcceptRequestDetailView {...listEntries[selectedMarkerIndex]} closeDetailView={() => setSelectedMarkerIndex(-1)} />
                    }

                </div>
            </div>
        </>
    );
}

export default AcceptRequestWindow;