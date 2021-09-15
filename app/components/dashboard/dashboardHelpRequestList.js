import React, { useState } from 'react';
import { Select } from 'antd';
import StatusSwitcher, { STATUS_ALL, STATUS_CLOSED, STATUS_OPEN, STATUS_WIP } from '../StatusSwitcher';
import AuthenticationContext from '../../contexts/authentication';

export default function DashboardHelpRequestList({helpRequests, updateHelpRequestStatus}) {
  const authenticationContext = React.useContext(AuthenticationContext);
  const isAdmin = authenticationContext.authenticationState.role === 'ADMIN';
  const userId = authenticationContext.authenticationState.uid;
  const dateTransform = (date) => {
    return new Date(date).toLocaleString();
  };
  const filteredRequests = helpRequests.filter(request => {
    return isAdmin || request.adminUser.id === userId || request.requestStatus === STATUS_OPEN;
  });
  const [showedRequests, setShowedRequests] = useState(filteredRequests);

  const changeStatus = (helpRequest, status) => {
    updateHelpRequestStatus(helpRequest, status);
  }

  const handleFilterChange = (status) => {
    if (status === STATUS_ALL) {
      setShowedRequests(filteredRequests);
    } else {
      setShowedRequests(filteredRequests.filter(request => request.requestStatus === status));
    }
  }

  return (
    <div>
      <table className="full-width-table">
        <thead>
          <tr>
            <th>Zuletzt geändert</th>
            <th>Hilfesuchender</th>
            <th>
              Status
              <Select defaultValue="alle" style={{ width: 132, marginLeft: 10, fontSize: 12 }} onChange={handleFilterChange}>
                <Select.Option value={STATUS_ALL}>alle</Select.Option>
                <Select.Option value={STATUS_OPEN}>offen</Select.Option>
                <Select.Option value={STATUS_WIP}>in Bearbeitung</Select.Option>
                <Select.Option value={STATUS_CLOSED}>geschlossen</Select.Option>
              </Select>
            </th>
            <th>Übersicht</th>
          </tr>
        </thead>
        <tbody>
        {
          showedRequests.map((helpRequest) => (
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
