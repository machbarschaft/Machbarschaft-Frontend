import React, { useEffect, useContext } from 'react';
import Divider from 'antd/lib/divider';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import useDashboard from '../../hooks/useDashboard';
import AuthenticationContext from '../../contexts/authentication';
import { STATUS_CLOSED, STATUS_WIP } from '../../components/StatusSwitcher';

function DashboardWindow() {
  const authenticationContext = useContext(AuthenticationContext);
  const [requestsState] = useDashboard('helper');
  const [localRequestsState, setLocalRequestsState] = React.useState(null);
  const history = useHistory();

  const userId = authenticationContext.authenticationState.uid;

  useEffect(() => {
    if (requestsState?.helpRequestsResult?.length) {
      const userRequests = requestsState.helpRequestsResult.filter((request) => request.helper?.id === userId);
      setLocalRequestsState(userRequests);
    }
  }, [requestsState]);

  const dateTransform = (date) => {
    return new Date(date).toLocaleString();
  };

  const startHelpRequest = (id) => {
    history.push(`/help-request/${id}`);
  }

  return (
    <div className="content-container-default background-light-grey">
      {
        localRequestsState && (
          <>
            <h2>In Arbeit</h2>
            <table className="full-width-table">
              <thead>
              <tr>
                <th>Datum</th>
                <th>Name</th>
                <th>Übersicht</th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {
                localRequestsState.map(localRequest => {
                  if (localRequest.requestStatus === STATUS_WIP) {
                    return (
                      <tr key={localRequest.id}>
                        <td>{dateTransform(localRequest.updatedAt)}</td>
                        <td>{localRequest.helpSeeker.fullName}</td>
                        <td>{localRequest.requestText}</td>
                        <td>
                          <Button
                            type="primary"
                            onClick={() => startHelpRequest(localRequest.id)}
                          >
                            Auftrag starten
                          </Button>
                        </td>
                      </tr>
                    )
                  }
                })
              }
              </tbody>
            </table>

            <Divider dashed />

            <h2>Durchgeführt</h2>
            <table className="full-width-table">
              <thead>
              <tr>
                <th>Datum</th>
                <th>Name</th>
                <th>Übersicht</th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {
                localRequestsState.map(localRequest => {
                  if (localRequest.requestStatus === STATUS_CLOSED) {
                    return (
                      <tr key={localRequest.id}>
                        <td>{dateTransform(localRequest.updatedAt)}</td>
                        <td>{localRequest.helpSeeker.fullName}</td>
                        <td>{localRequest.requestText}</td>
                        <td>
                          <Button
                            type="primary"
                            onClick={() => startHelpRequest(localRequest.id)}
                          >
                            Auftrag starten
                          </Button>
                        </td>
                      </tr>
                    )
                  }
                })
              }
              </tbody>
            </table>
          </>
        )
      }
    </div>
  );
}
export default DashboardWindow;
