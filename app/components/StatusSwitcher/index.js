import React from 'react';

const STATUS_OPEN = 'OPEN';
const STATUS_WIP = 'WIP';
const STATUS_CLOSED = 'CLOSED';

export default function StatusSwitcher({helpRequest, onStatusChange, isAdmin}) {
  const status = helpRequest.requestStatus;

  return (
    <div className={`status-switcher ${!isAdmin ? 'status-switcher-disabled' : ''}`}>
      <button className={`round-button-status passed-status`} onClick={() => onStatusChange(STATUS_OPEN)} />
      <button className={`round-button-status ${(status === STATUS_WIP || status === STATUS_CLOSED) ? 'passed-status' : ''}`} onClick={() => onStatusChange(STATUS_WIP)} />
      <button className={`round-button-status ${status === STATUS_CLOSED ? 'passed-status' : ''}`} onClick={() => onStatusChange(STATUS_CLOSED)} />
      <span>
        {
          status === STATUS_OPEN && 'offen'
        }
        {
          status === STATUS_WIP && 'in Bearbeitung'
        }
        {
          status === STATUS_CLOSED && 'geschlossen'
        }
      </span>
    </div>
  );
}
