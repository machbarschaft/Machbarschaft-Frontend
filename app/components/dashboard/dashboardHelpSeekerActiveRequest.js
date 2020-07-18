import React from 'react';
import PropTypes from 'prop-types';
import DashboardTileHelpSeekerStatus from './dashboardTileHelpSeekerStatus';
import DashboardTileContact from './dashboardTileContact';
import DashboardTileUrgency from './dashboardTileUrgency';
import DashboardTileRequestType from './dashboardTileRequestType';
import DashboardTileAdditionalInformation from './dashboardTileAdditionalInformation';

export default function DashboardHelpSeekerActiveRequest({
    name,
    phoneHelpSeeker,
    phoneHelper,
    status,
    requestType,
    urgency,
    carNecessary,
    prescriptionRequired,
    address,
    startedAt
}) {
    return (
        <div className="dashboard-columns-container">
            <div className="dashboard-column">
            <DashboardTileHelpSeekerStatus
                name={name}
                phone={phoneHelpSeeker}
                status={status}
            />
            <DashboardTileRequestType requestType={requestType} />
            {status == "open" &&
                <div className="dashboard-cancel-button-container">
                <Button className="dashboard-cancel-button" type="primary">
                    AUFTRAG ABBRECHEN
                </Button>
                </div>
            }
            </div>
            <div className="dashboard-column">
            <DashboardTileUrgency urgency={urgency} />
            <DashboardTileAdditionalInformation
                carNecessary={carNecessary}
                prescriptionRequired={prescriptionRequired}
                timestamp={startedAt}
            />
            <DashboardTileContact
                phone={phoneHelper}
                street={address.street}
                zipCode={address.zipCode}
                city={address.city}
            />
            </div>
        </div>
    );
}
DashboardHelpSeekerActiveRequest.propTypes = {
    name: PropTypes.string.isRequired,
    phoneHelpSeeker: PropTypes.number.isRequired,
    phoneHelper: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['open', 'accepted', 'called', 'on-the-way']).isRequired,
    requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
    urgency: PropTypes.oneOf(['now', 'today', 'tomorrow', 'this-week']).isRequired,
    carNecessary: PropTypes.bool.isRequired,
    prescriptionRequired: PropTypes.bool.isRequired,
    address: PropTypes.object.isRequired,
    startedAt: PropTypes.string.isRequired
}