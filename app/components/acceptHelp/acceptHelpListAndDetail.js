import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import AcceptRequestDetailView from "./acceptRequestDetailView";

export default function AcceptHelpListAndDetail({selectedMarkerIndex, setSelectedMarkerIndex, listEntries, listEntriesRender}) {
    return (
        <>     
            {selectedMarkerIndex < 0 ?
                <div className="accept-help-request-list">
                    {listEntriesRender}
                </div>
                :<AcceptRequestDetailView {...listEntries[selectedMarkerIndex]} closeDetailView={() => setSelectedMarkerIndex(-1)} />
            }
        </>
    );
}
AcceptHelpListAndDetail.propTypes = {
    selectedMarkerIndex: PropTypes.number.isRequired,
    setSelectedMarkerIndex: PropTypes.func.isRequired,
    listEntries: PropTypes.array.isRequired,
    listEntriesRender: PropTypes.node.isRequired
};