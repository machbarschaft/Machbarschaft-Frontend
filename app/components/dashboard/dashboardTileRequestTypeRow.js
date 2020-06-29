import React from 'react';
import PropTypes from 'prop-types';

function DashboardTileRequestTypeRow({imgSrc, title}) {
    return (
        <div className={"dashboard-tile-request-type-row"}>
            <img className={"dashboard-tile-request-type-image"} src={imgSrc} />
            <div className={"dashboard-tile-request-type-title"}>{title}</div>
        </div>
    );
}
DashboardTileRequestTypeRow.propTypes = {
    imgSrc: PropTypes.isRequired,
    title: PropTypes.string.isRequired
};
export default DashboardTileRequestTypeRow;
