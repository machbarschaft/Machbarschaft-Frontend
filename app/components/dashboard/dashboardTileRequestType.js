import React from 'react';
import PropTypes from 'prop-types';
import DashboardTile from "./dashboardTile";
import RequestTypeOther from "../../assets/img/request-category/request-category-other.svg";
import RequestTypeGroceries from "../../assets/img/request-category/request-category-groceries.svg";
import RequestTypeMedication from "../../assets/img/request-category/request-category-medication.svg";
import DashboardTileRequestTypeRow from "./dashboardTileRequestTypeRow";

function DashboardTileRequestType({requestType}) {
    return (
        <DashboardTile title={"Typ des Auftrags"} content={
            <>
                {requestType.includes("medication") &&
                    <DashboardTileRequestTypeRow imgSrc={RequestTypeMedication} title={"Medikamente einkaufen"} />
                }
                <div className={"dashboard-tile-spacing"}></div>
                {requestType.includes("groceries") &&
                    <DashboardTileRequestTypeRow imgSrc={RequestTypeGroceries} title={"Lebensmittel einkaufen"} />
                }
                <div className={"dashboard-tile-spacing"}></div>
                {requestType.includes("other") &&
                    <DashboardTileRequestTypeRow imgSrc={RequestTypeOther} title={"Produkte einkaufen"} />
                }
            </>
        }/>
    );
}
DashboardTileRequestType.propTypes = {
    requestType: PropTypes.oneOf(["groceries", "medication", "other"]).isRequired
};
export default DashboardTileRequestType;