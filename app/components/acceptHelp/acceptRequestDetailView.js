import React from "react";
import {Button, Typography} from 'antd';
import PropTypes from "prop-types";
import ArrowLeft from "../../assets/img/navigation/arrow-left.svg";
import RequestTypeGeneral from "../../assets/img/request-category/request-category-general.svg";
import RequestTypeGrocery from "../../assets/img/request-category/request-category-grocery.svg";
import RequestTypeMedicine from "../../assets/img/request-category/request-category-medicine.svg";
import CarRequired from "../../assets/img/request-requirements/car-required.svg";
import CarNotRequired from "../../assets/img/request-requirements/car-not-required.svg";
import PrescriptionRequired from "../../assets/img/request-requirements/prescription-required.svg";
import PrescriptionNotRequired from "../../assets/img/request-requirements/prescription-not-required.svg";
const {Text} = Typography;

export default function AcceptRequestDetailView({
    request, distance, closeDetailView
}) {
    let categoryTitle = "";
    if(request.requestType.length == 0) categoryTitle = "Keine Kategorie angegeben";
        else categoryTitle = "Kategorie: ";

    return (
        <div className="accept-help-request-detail">
            <div className="accept-help-request-detail-header">
                <div className="accept-help-request-detail-back">
                    <img src={ArrowLeft} onClick={() => closeDetailView()} />
                </div>
                <div className="accept-help-request-detail-title">
                    {request.address.street}, {request.address.zipCode} {request.address.city}
                </div>
            </div>
            <div className="accept-help-request-detail-main">
                <div className="accept-help-request-detail-info">
                    <Text strong>{categoryTitle}</Text>
                    <div className="display-flex">
                        {request.requestType.includes("grocery") && <img className="accept-help-request-detail-icon" src={RequestTypeGrocery} />}
                        {request.requestType.includes("medicine") && <img className="accept-help-request-detail-icon" src={RequestTypeMedicine} />}
                        {request.requestType.includes("general") && <img className="accept-help-request-detail-icon" src={RequestTypeGeneral} />}
                    </div>
                    <Text strong>Distanz:</Text><div>{distance}</div>
                    <Text strong>Dringlichkeit:</Text><div>{request.urgency}</div>
                    <Text strong>Auto benötigt:</Text>
                    <img className="accept-help-request-detail-icon" src={request.extras.carNecessary ? CarRequired : CarNotRequired} />
                    <Text strong>Rezept benötigt:</Text>
                    <img className="accept-help-request-detail-icon" src={request.extras.prescriptionRequired ? PrescriptionRequired : PrescriptionNotRequired} />
                </div>
            </div>
            <div className="horizontal-center">
                <Button className="accept-help-request-detail-button" type="primary">Auftrag annehmen</Button>
            </div>
        </div>
    );
}
AcceptRequestDetailView.propTypes = {
    request: PropTypes.object.isRequired,
    distance: PropTypes.string.isRequired,
    closeDetailView: PropTypes.func.isRequired
}