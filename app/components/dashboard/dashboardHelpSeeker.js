import React from "react";
import {Typography, Button, Menu} from "antd";
import DashboardTile from "./dashboardTile";
import DashboardTileHelpSeekerStatus from "./dashboardTileHelpSeekerStatus";
import DashboardTileContact from "./dashboardTileContact";
import DashboardTileUrgency from "./dashboardTileUrgency";
import DashboardTileRequestType from "./dashboardTileRequestType";
import DashboardTileAdditionalInformation from "./dashboardTileAdditionalInformation";
import DashboardHelperOldRequests from "./dashboardHelperOldRequests";
import RequestTypeOther from "../../assets/img/request-category/request-category-other.svg";
import RequestTypeGroceries from "../../assets/img/request-category/request-category-groceries.svg";
import RequestTypeMedication from "../../assets/img/request-category/request-category-medication.svg";
import RequestTypeOtherWhite from "../../assets/img/request-category/request-category-other-white.svg";
import RequestTypeGroceriesWhite from "../../assets/img/request-category/request-category-groceries-white.svg";
import RequestTypeMedicationWhite from "../../assets/img/request-category/request-category-medication-white.svg";
import ClockIcon from "../../assets/img/clock-icon.svg";
import ClockIconWhite from "../../assets/img/clock-icon-white.svg";
import DashboardHelpSeekerOldRequests from "./dashboardHelpSeekerOldRequests";
const {Title} = Typography;

function DashboardHelpSeeker() {
    const [menuKey, setMenuKey] = React.useState("request-1");

    return (
        <div className="dashboard-helpseeker-container">
            <div className="dashboard-menu-container">
                <div className="dashboard-menu">
                    <Menu onClick={(e) => setMenuKey(e.key)} selectedKeys={menuKey} mode="vertical">
                        <Menu.Item key="request-1" className={
                            "dashboard-menu-button" + (menuKey == "request-1" ? " dashboard-menu-button-selected": " dashboard-menu-button-default")
                        }>
                            <div className="dashboard-menu-request-types">
                                <img className="dashboard-menu-request-type-image" src={
                                    menuKey == "request-1" ? RequestTypeOtherWhite : RequestTypeOther
                                } />
                            </div>
                            <span>AUFTRAG 1</span>
                        </Menu.Item>
                        <Menu.Item key="old-requests" className={
                            "dashboard-menu-button " + (menuKey == "old-requests" ? " dashboard-menu-button-selected": " dashboard-menu-button-default")
                        }>
                            <div className="dashboard-menu-request-types">
                                <img className="dashboard-menu-request-type-image" src={
                                    menuKey == "old-requests" ? ClockIconWhite : ClockIcon
                                } />
                            </div>
                            <span>ALTE AUFTRÄGE</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
            {menuKey == "request-1" &&
                <div className="dashboard-columns-container">
                    <div className="dashboard-column">
                        <DashboardTileHelpSeekerStatus name={"Max Schmidt"} phone={"040/299960980"} status={"accepted"} />
                        <DashboardTileRequestType requestType={"groceries"} />
                        <div className="dashboard-cancel-button-container">
                            <Button className="dashboard-cancel-button" type="primary">AUFTRAG ABBRECHEN</Button>
                        </div>
                    </div>
                    <div className="dashboard-column">
                        <DashboardTileUrgency urgency={"now"} />
                        <DashboardTileAdditionalInformation carNecessary={true} prescriptionRequired={false} timestamp={1593672043} />
                        <DashboardTileContact
                            phone={"089/8354081"}
                            street={"Höhenstadter Str. 56"}
                            zipCode={81671}
                            city={"München"}
                        />
                    </div>
                </div>
            }
            {menuKey == "old-requests" &&
                <DashboardHelpSeekerOldRequests />
            }
        </div>
    );
}

export default DashboardHelpSeeker;