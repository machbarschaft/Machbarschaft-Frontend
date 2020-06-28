import React from 'react';
import {Table, Typography} from 'antd';
import PropTypes from 'prop-types';
const {Text} = Typography;

function DashboardTileContact({name, phone, phoneCode, address, city}) {
    return (
        <>
            <Text strong>Kontakt</Text>
            <div className={"dashboard-tile-spacing"}></div>
            <div className={"dashboard-tile-grid"}>
                <span>Name:</span><span>{name}</span>
                <span>Telefon:</span><span>{phone}</span>
                <span>Telefoncode:</span><span>{phoneCode}</span>
                <span>Adresse:</span><span>{address}</span>
                <span>Ort:</span><span>{city}</span>
            </div>
        </>
    );
}
DashboardTileContact.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    phoneCode: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
};
export default DashboardTileContact;