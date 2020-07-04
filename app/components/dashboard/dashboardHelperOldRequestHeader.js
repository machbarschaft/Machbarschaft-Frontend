import React from "react";
import PropTypes from "prop-types";
import RequestTypeOther from "../../assets/img/request-category/request-category-other.svg";
import RequestTypeGroceries from "../../assets/img/request-category/request-category-groceries.svg";
import RequestTypeMedication from "../../assets/img/request-category/request-category-medication.svg";

function DashboardHelperOldRequestHeader({
	finishedAt,
	requestType
}) {
	const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
	const finishedDate = new Date(finishedAt * 1000);
    const dateString = finishedDate.getDate() + ". " + monthNames[finishedDate.getMonth()] + " " + finishedDate.getFullYear();
    console.log("Month: " + finishedDate.getMonth() + ", name: " + monthNames[finishedDate.getMonth()]);

	return (
		<div className="display-flex">
			{dateString}
			<div className="dashboard-collapse-request-category">
                <img src={RequestTypeGroceries} className={requestType.includes("groceries") ? "" : "visibility-hidden"} />
                <img src={RequestTypeMedication} className={requestType.includes("medication") ? "" : "visibility-hidden"} />
                <img src={RequestTypeOther} className={requestType.includes("other") ? "" : "visibility-hidden"} />
            </div>
		</div>
	);
}
DashboardHelperOldRequestHeader.propTypes = {
	finishedAt: PropTypes.number.isRequired,
	requestType: PropTypes.oneOf(["groceries", "medication", "other"]).isRequired
}
export default DashboardHelperOldRequestHeader;