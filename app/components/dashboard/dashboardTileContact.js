import React from 'react';
import PropTypes from 'prop-types';
import DashboardTile from "./dashboardTile";

function DashboardTileContact({name, phone, street, zipCode, city}) {
    return (
        <DashboardTile title={"Kontakt"} content={
            <>
                <div className={"dashboard-tile-spacing"}></div>
                <div className={"dashboard-tile-grid"}>
                    <span>Name:</span><span>{name}</span>
                    <span>Telefon:</span><span>{phone}</span>
                    <span>Adresse:</span><span>{street}</span>
                    <span>Ort:</span><span>{zipCode + " " + city}</span>
                </div>
            </>
        }/>
    );
}
DashboardTileContact.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zipCode: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired
};
export default DashboardTileContact;