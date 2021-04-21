import React from 'react';
import StatusSwitcher, { STATUS_OPEN } from '../StatusSwitcher';
import AuthenticationContext from '../../contexts/authentication';

export default function DashboardHelpRequestList({helpRequests, updateHelpRequestStatus}) {
  const authenticationContext = React.useContext(AuthenticationContext);
  const isAdmin = authenticationContext.authenticationState.role === 'ADMIN';
  const userId = authenticationContext.authenticationState.uid;
  const dateTransform = (date) => {
    return new Date(date).toLocaleString();
  };
  const filteredRequests = helpRequests.filter((request) => {
    return isAdmin || request.adminUser.id === userId || request.requestStatus === STATUS_OPEN;
  });

  const changeStatus = async (helpRequest, status) => {
    updateHelpRequestStatus(helpRequest, status);
  }

  return (
    <div>
      <table className="full-width-table">
        <thead>
          <tr>
            <th>Zuletzt geändert</th>
            <th>Hilfesuchender</th>
            <th>Status</th>
            <th>Übersicht</th>
          </tr>
        </thead>
        <tbody>
        {
          filteredRequests.map((helpRequest) => (
            <tr key={helpRequest.id}>
              <td>{dateTransform(helpRequest.updatedAt)}</td>
              <td>{helpRequest.helpSeeker.fullName}</td>
              <td>{<StatusSwitcher isAdmin={isAdmin} onStatusChange={(status) => changeStatus(helpRequest, status)} helpRequest={helpRequest} />}</td>
              <td>{helpRequest.requestText}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}
