import React, { useState } from 'react';
import { Select, Modal, notification } from 'antd';
import StatusSwitcher, { STATUS_ALL, STATUS_CLOSED, STATUS_OPEN, STATUS_WIP } from '../StatusSwitcher';
import AuthenticationContext from '../../contexts/authentication';
import iconEdit from '../../assets/img/icon-edit.svg';
import { RequestForm } from '../requestForm/requestForm';
import { editHelpRequest } from '../../utils/api/placeRequestApi';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const getAddress = (helpSeeker) => {
    if (helpSeeker.street && helpSeeker.city) {
      return `${helpSeeker.street} ${helpSeeker.streetNo}, ${helpSeeker.zipCode} ${helpSeeker.city}`;
    }
  }

  const editRequest = (request) => {
    const requestValue = {
      id: request.helpSeeker.id,
      city: request.helpSeeker.city,
      street: request.helpSeeker.street,
      streetNo: request.helpSeeker.streetNo,
      zipCode: request.helpSeeker.zipCode,
      fullName: request.helpSeeker.fullName,
      phone: request.helpSeeker.phone,
      requestText: request.requestText,
      location: request.location,
      status: request.requestStatus
    };
    setIsEditMode(true);
    setSelectedRequest(requestValue);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setSelectedRequest(null);
  };

  const onFinish = async (values) => {
    const helpRequestBody = {
      city: values.city,
      firstName: values.fullName.split(' ')[0],
      lastName: values.fullName.split(' ')[1],
      location: selectedRequest.location,
      phone: values.phone,
      postCode: values.zipCode,
      requestText: values.requestText,
      status: selectedRequest.status,
      street: values.street,
      streetNumber: values.streetNo
    };
    authenticationContext.startLoading();
    try {
      await editHelpRequest(helpRequestBody, selectedRequest.id);
    } catch (e) {
      notification.error({
        message: 'Fehler',
        description:
          'Es ist ein Fehler aufgetreten, bitte versuche es erneut!',
      });
    }
    authenticationContext.finishLoading();
    cancelEdit();
  };

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
            <th>Telefonnummer</th>
            <th>Übersicht</th>
            <th>Adresse</th>
            <th/>
          </tr>
        </thead>
        <tbody>
        {
          showedRequests.map((helpRequest) => (
            <tr key={helpRequest.id}>
              <td>{dateTransform(helpRequest.updatedAt)}</td>
              <td>{helpRequest.helpSeeker.fullName}</td>
              <td>{<StatusSwitcher isAdmin={isAdmin} onStatusChange={(status) => changeStatus(helpRequest, status)} helpRequest={helpRequest} />}</td>
              <td>{helpRequest.helpSeeker.phone}</td>
              <td>{helpRequest.requestText}</td>
              <td>{getAddress(helpRequest.helpSeeker)}</td>
              <td onClick={() => editRequest(helpRequest)} className="image-cell"><img src={iconEdit}/></td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <Modal destroyOnClose={true} footer={null} title="Auftrag bearbeiten" visible={isEditMode} onCancel={cancelEdit}>
        <RequestForm
          initialValues={{...selectedRequest, remember: true }}
          onFinish={onFinish}
        />
      </Modal>
    </div>
  );
}
