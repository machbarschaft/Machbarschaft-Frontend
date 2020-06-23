import React from "react";
import {Button} from 'antd';
import PropTypes from "prop-types";
import ArrowLeft from "../../assets/img/navigation/arrow-left.svg";
import RequestTypeGeneral from "../../assets/img/request-category/request-category-general.svg";
import RequestTypeGrocery from "../../assets/img/request-category/request-category-grocery.svg";
import RequestTypeMedicine from "../../assets/img/request-category/request-category-medicine.svg";
import CarRequired from "../../assets/img/request-requirements/car-required.svg";
import CarNotRequired from "../../assets/img/request-requirements/car-not-required.svg";
import PrescriptionRequired from "../../assets/img/request-requirements/prescription-required.svg";
import PrescriptionNotRequired from "../../assets/img/request-requirements/prescription-not-required.svg";

export default function AcceptRequestDetailView({
    address, distance, categories, urgency, carrequired, prescriptionrequired, closeDetailView
}) {
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
AcceptRequestDetailView.propTypes = {
    address: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    urgency: PropTypes.string.isRequired,
    carrequired: PropTypes.bool.isRequired,
    prescriptionrequired: PropTypes.bool.isRequired,
    closeDetailView: PropTypes.func.isRequired
}