import React from 'react';
import PropTypes from 'prop-types';

const DashboardHelpSeekerFinishedRequests = React.lazy(() =>
  import('./dashboardHelpSeekerFinishedRequests')
);
const DashboardHelpSeekerMenu = React.lazy(() =>
  import('./dashboardHelpSeekerMenu')
);
const DashboardHelpSeekerActiveRequest = React.lazy(() =>
  import('./dashboardHelpSeekerActiveRequest')
);
const DashboardHelperActiveRequest = React.lazy(() =>
  import('./dashboardHelperActiveRequest')
);
const DashboardHelperFinishedRequests = React.lazy(() =>
  import('./dashboardHelperFinishedRequests')
);
const DashboardFeedBackHelper = React.lazy(() =>
  import('./dashboardFeedBackHelper')
);
const DashboardFeedBackHelpSeeker = React.lazy(() =>
  import('./dashboardFeedBackHelpSeeker')
);

function DashboardHelpSeeker({
  activeRequestsHelpSeeker,
  activeRequestsHelper,
  finishedRequestsHelpSeeker,
  finishedRequestsHelper,
  refreshRequests,
  refreshRequestsBackground,
}) {
  const [menuKey, setMenuKey] = React.useState('');
  const [
    activeRequestsHelpSeekerRender,
    setActiveRequestsHelpSeekerRender,
  ] = React.useState([]);
  const [
    activeRequestsHelperRender,
    setActiveRequestsHelperRender,
  ] = React.useState([]);

  const selectMenuKey = () => {
    var changeRequired = false;
    if (menuKey === '') changeRequired = true;
    else if (
      menuKey === /^hs\d+$/.test(menuKey) &&
      activeRequestsHelpSeeker.length <= menuKey.match(/\d+/)[0]
    )
      changeRequired = true;
    else if (menuKey === 'active-helper' && activeRequestsHelper === null)
      changeRequired = true;
    else if (
      menuKey === 'finished-helpseeker' &&
      finishedRequestsHelpSeeker.length === 0
    )
      changeRequired = true;
    else if (menuKey === 'finished-helper' && finishedRequestsHelper === 0)
      changeRequired = true;

    if (changeRequired) {
      if (activeRequestsHelpSeeker.length > 0) setMenuKey('hs0');
      else if (activeRequestsHelper.length > 0) setMenuKey('active-helper');
      else if (finishedRequestsHelpSeeker.length > 0)
        setMenuKey('finished-helpseeker');
      else if (finishedRequestsHelpSeeker.length > 0)
        setMenuKey('finished-helper');
    }
  };

  React.useEffect(() => {
    setActiveRequestsHelpSeekerRender(
      activeRequestsHelpSeeker.map((entry) => (
        <div>
          {!entry.feedbackSubmitted &&
            ['done', 'aborted', 'did-not-help'].includes(entry.helperStatus) &&
            entry.status != 'open' && (
              <DashboardFeedBackHelpSeeker
                requestId={entry._id}
                name={entry.name}
                status={entry.helperStatus}
                feedBackSent={() => refreshRequests()}
              />
            )}
          <DashboardHelpSeekerActiveRequest
            name={entry.name}
            phoneHelpSeeker={entry.phoneHelpSeeker}
            phoneHelper={entry.phoneHelper}
            status={entry.status === 'open' ? 'open' : entry.helperStatus}
            requestType={entry.requestType}
            urgency={entry.urgency}
            carNecessary={entry.extras.carNecessary}
            prescriptionRequired={entry.extras.prescriptionRequired}
            address={entry.address}
            startedAt={entry.startedAt}
            processId={entry.process}
            refreshRequests={() => refreshRequestsBackground()}
          />
        </div>
      ))
    );
    selectMenuKey();
  }, [activeRequestsHelpSeeker]);

  React.useEffect(() => {
    setActiveRequestsHelperRender(
      activeRequestsHelper.map((entry) => (
        <div>
          {!entry.feedbackSubmitted && (
            <DashboardFeedBackHelper
              _id={entry._id}
              name={entry.name}
              feedBackSent={() => refreshRequests()}
            />
          )}
          <DashboardHelperActiveRequest
            name={entry.name}
            phoneHelpSeeker={40299960804}
            status={entry.status}
            requestType={entry.requestType}
            urgency={entry.urgency}
            carNecessary={entry.extras.carNecessary}
            prescriptionRequired={entry.extras.prescriptionRequired}
            address={entry.address}
            startedAt={entry.startedAt}
            processId={entry.process}
            refreshRequests={() => refreshRequestsBackground()}
          />
        </div>
      ))
    );
    selectMenuKey();
  }, [activeRequestsHelper]);

  React.useEffect(() => {
    selectMenuKey();
  }, [finishedRequestsHelpSeeker, finishedRequestsHelper]);

  const menuRender = (mode) => (
    <DashboardHelpSeekerMenu
      mode={mode}
      menuKey={menuKey}
      setMenuKey={setMenuKey}
      activeRequestsHelpSeeker={activeRequestsHelpSeeker}
      activeRequestsHelper={activeRequestsHelper}
      finishedRequestsHelpSeeker={finishedRequestsHelpSeeker.length > 0}
      finishedRequestsHelper={finishedRequestsHelper.length > 0}
    />
  );

  return (
    <>
      <div className="dashboard-helpseeker-container">
        <div className="dashboard-menu-container">
          <div className="dashboard-menu-desktop">{menuRender('vertical')}</div>
          <div className="dashboard-menu-mobile">
            {menuRender('horizontal')}
          </div>
        </div>
        {/^hs\d+$/.test(menuKey) &&
          activeRequestsHelpSeekerRender[menuKey.match(/\d+/)[0]]}
        {/^h\d+$/.test(menuKey) &&
          activeRequestsHelperRender[menuKey.match(/\d+/)[0]]}
        {menuKey === 'finished-helpseeker' && (
          <DashboardHelpSeekerFinishedRequests
            requestList={finishedRequestsHelpSeeker}
          />
        )}
        {menuKey === 'finished-helper' && (
          <DashboardHelperFinishedRequests
            requestList={finishedRequestsHelper}
          />
        )}
        <div className="dashboard-tile-spacing" />
      </div>
    </>
  );
}
DashboardHelpSeeker.propTypes = {
  activeRequestsHelpSeeker: PropTypes.array.isRequired,
  activeRequestsHelper: PropTypes.array.isRequired,
  finishedRequestsHelpSeeker: PropTypes.array.isRequired,
  finishedRequestsHelper: PropTypes.array.isRequired,
  refreshRequests: PropTypes.func.isRequired,
  refreshRequestsBackground: PropTypes.func.isRequired,
};
export default DashboardHelpSeeker;
