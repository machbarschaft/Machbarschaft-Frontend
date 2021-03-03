import React from 'react';

export default function DashboardHelpRequestList({helpRequests}) {
  const dateTransform = (date) => {
    return new Date(date).toLocaleString();
  };

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
          helpRequests.map((helpRequest) => (
            <tr key={helpRequest.id}>
              <td>{dateTransform(helpRequest.updatedAt)}</td>
              <td>{helpRequest.helpSeeker.fullName}</td>
              <td>{helpRequest.requestStatus}</td>
              <td>{helpRequest.requestText}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}
