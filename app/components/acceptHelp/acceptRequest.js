import React from "react";
import ReactDOM from "react-dom";
import {Input, Select, Button} from 'antd';
import MapContainer from "./googleMaps";
import {SearchOutlined} from '@ant-design/icons';
import RequestTypeGeneral from "../../assets/img/request-category/request-category-general.svg";
import RequestTypeGrocery from "../../assets/img/request-category/request-category-grocery.svg";
import RequestTypeMedicine from "../../assets/img/request-category/request-category-medicine.svg";

function AcceptRequestListEntry(props) {
    return (
        <div className="accept-help-request-list-entry">
            <div className="accept-help-request-list-entry-number">{props.number}</div>
            <div className="accept-help-request-list-entry-address">{props.address}</div>
            <div className="accept-help-request-list-entry-category">
                <img src={RequestTypeGrocery} className={props.categories.includes("grocery") ? "" : "visibility-hidden"} />
                <img src={RequestTypeMedicine} className={props.categories.includes("medicine") ? "" : "visibility-hidden"} />
                <img src={RequestTypeGeneral} className={props.categories.includes("general") ? "" : "visibility-hidden"} />
            </div>
            <div className="accept-help-request-list-entry-distance">{props.distance}</div>
        </div>  
    );
}

function AcceptRequestWindow() {
    //const [mapRender, setMapRender] = React.useState("");

    //React.useEffect(() => setMapRender(<MapContainer />));
    /*
    */
    const listEntries = [
        {
            address: "Konradstraße, 80801 München",
            distance: "2,6km",
            categories: ["general", "medicine"]
        },{
            address: "Konradstraße, 80801 München",
            distance: "2,6km",
            categories: ["general", "medicine"]
        },{
            address: "Konradstraße, 80801 München",
            distance: "2,6km",
            categories: ["general", "medicine"]
        },{
            address: "Konradstraße, 80801 München",
            distance: "2,6km",
            categories: ["general", "medicine"]
        }
    ];
    const listLength = listEntries.length;
    const listEntriesRender = listEntries.map((entry, index) => 
        <>
            <AcceptRequestListEntry number={index+1} {...entry} key={index} />
            {(index < listLength-1) && <div className="accept-help-request-list-divider"></div>}
        </>
    );
    console.log(listEntriesRender);


    /*
    <div className="flex-space-around">
            <div className="accept-help-container">
                <div className="accept-help-map-container"><MapContainer /></div>
            </div>
            <div className="accept-help-right-bar">
                <div className="accept-help-search-bar">
                    <Input placeholder="Adresse eingeben" bordered={false} />
                    <Select defaultValue="25" bordered={false} onChange={(value) => console.log(`selected ${value}`)}>
                        <Option value="5">5km</Option>
                        <Option value="10">10km</Option>
                        <Option value="15">15km</Option>
                        <Option value="25">25km</Option>
                        <Option value="50">50km</Option>
                        <Option value="70">70km</Option>
                    </Select>
                    <Button shape="circle" icon={<SearchOutlined />} />
                </div>
                <div className="accept-help-request-list">
                    {listEntriesRender}
                </div>
            </div>
        </div>
    */
    return (
        <>
            <MapContainer />
            <div className="accept-help-right-bar">
                <div className="accept-help-search-bar">
                    <Input placeholder="Adresse eingeben" bordered={false} />
                    <Select defaultValue="25" bordered={false} onChange={(value) => console.log(`selected ${value}`)}>
                        <Option value="5">5km</Option>
                        <Option value="10">10km</Option>
                        <Option value="15">15km</Option>
                        <Option value="25">25km</Option>
                        <Option value="50">50km</Option>
                        <Option value="70">70km</Option>
                    </Select>
                    <Button shape="circle" icon={<SearchOutlined />} />
                </div>
                <div className="accept-help-request-list">
                    {listEntriesRender}
                </div>
            </div>
        </>
    );
}

export default AcceptRequestWindow;