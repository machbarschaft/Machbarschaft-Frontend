import React from 'react';
import { Result } from 'antd';
import PropTypes from 'prop-types';
import AcceptRequestDetailView from './acceptRequestDetailView';

export default function AcceptHelpListAndDetail({
  selectedMarkerIndex,
  setSelectedMarkerIndex,
  listEntries,
  listEntriesRender,
  showNoRequestWarning,
  error
}) {
  return (
    <>
      {selectedMarkerIndex < 0 ? (
        <>
          {error == null &&
            <div className="accept-help-request-list">
              {error == null && listEntries.length > 0 && listEntriesRender}
              {error == null && listEntries.length == 0 && showNoRequestWarning &&
                <div className="accept-help-no-request-text">
                  Es gibt keine Aufträge im angegebenen Radius in Ihrer Nähe.
                </div>
              }
            </div>
          }
          {error != null &&
            <Result
              status="error"
              title="Es ist ein Fehler aufgetreten!"
              subTitle={error.toString()}
            />
          }
        </>
      ) : (
        <AcceptRequestDetailView
          {...listEntries[selectedMarkerIndex]}
          closeDetailView={() => setSelectedMarkerIndex(-1)}
        />
      )}
    </>
  );
}
AcceptHelpListAndDetail.propTypes = {
  listEntries: PropTypes.array.isRequired,
  listEntriesRender: PropTypes.node.isRequired,
  selectedMarkerIndex: PropTypes.number.isRequired,
  setSelectedMarkerIndex: PropTypes.func.isRequired,
  showNoRequestWarning: PropTypes.bool.isRequired,
  error: PropTypes.object
};
