import React from 'react';
import DashboardTile from "./dashboardTile";
import PropTypes from 'prop-types';

function DashboardTileUrgency({urgency}) {
    const urgencyMapping = {
        "now": "sobald wie möglich",
        "today": "heute",
        "tomorrow": "morgen",
        "this-week": "diese Woche"
    };
    return (
        <DashboardTile title={"Dringlichkeit"} content={urgency in urgencyMapping ?
            <>Der Auftrag soll {urgencyMapping[urgency]} bearbeitet werden.</>
            :
            <>Unbekannte Dringlichkeit</>
        }/>
    );
}
DashboardTileUrgency.propTypes = {
    urgency: PropTypes.oneOf(["now", "today", "tomorrow", "this-week"]).isRequired
};
export default DashboardTileUrgency;