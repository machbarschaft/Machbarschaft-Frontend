import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, message } from 'antd';
import useDashboard from '../../../hooks/useDashboard';
import { acceptOpenRequest, changeRequestStatus } from '../../../utils/api/acceptHelpApi';
import { STATUS_CLOSED, STATUS_OPEN } from '../../../components/StatusSwitcher';

export default function HelpRequestDetail() {
  let { id } = useParams();
  const [requestsState] = useDashboard('helper');
  const [helpRequest, setHelpRequest] = React.useState(null);
  const history = useHistory();

  useEffect(() => {
    if (requestsState?.helpRequestsResult?.length) {
      const selectedHelpRequest = requestsState.helpRequestsResult.find(request => request.id === id);
      setHelpRequest(selectedHelpRequest);
    }
  }, [requestsState]);

  const dateTransform = (date) => {
    return new Date(date).toLocaleString();
  };

  const finishHelpRequest = async () => {
    try {
      await changeRequestStatus({ requestId: id, status: { status: STATUS_CLOSED } })
      message.success('Erfolg!');
      history.push('/dashboard');
    } catch (err) {
      message.error('Es ist ein Fehler aufgetreten!');
    }
  };

  const cancelHelpRequest = async () => {
    try {
      const helpRequestBody = {
        helpSeeker: {
          fullName: helpRequest.helpSeeker.fullName,
          phone: helpRequest.helpSeeker.phone
        },
        helper: null,
        requestStatus: STATUS_OPEN,
        requestText: helpRequest.requestText
      };

      await acceptOpenRequest({ requestId: id, helpRequest: helpRequestBody });
      message.success('Auftrag erfolgreich storniert!');
      history.push('/dashboard');
    } catch (err) {
      message.error('Es ist ein Fehler aufgetreten!');
    }
  };

  return (
    <div className="content-container-default background-light-grey">
      {
        helpRequest && (
          <>
            <div className="request-cards-container">
              <Card className="request-card">
                <h4>Nächster Schritt:</h4>
                <p>1. Rufe die Person an und bespreche dich:</p>
                <ul>
                  <li>was wird gebraucht?</li>
                  <li>wie findet die Geld- und Warenübergabe statt?</li>
                  <li>Gibt es Besonderheiten?</li>
                </ul>
                <p>2. Erledige den Auftrag oder brich ihn ab, wenn dir etwas dazwischen kommt.</p>
              </Card>

              <Card className="request-card">
                <h4>Dringlichkeit</h4>
                <p>{helpRequest.requestText}</p>
              </Card>
            </div>

            <div className="request-cards-container">
              <Card className="request-card">
                <h4>Kontakt</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{helpRequest.helpSeeker.fullName}</td>
                    </tr>
                    <tr>
                      <td>Telefon:</td>
                      <td>{helpRequest.helpSeeker.phone}</td>
                    </tr>
                    <tr>
                      <td>Adresse:</td>
                      <td>{`${helpRequest.helpSeeker.enteredBy.street} ${helpRequest.helpSeeker.enteredBy.streetNo}`}</td>
                    </tr>
                    <tr>
                      <td>Ort:</td>
                      <td>{`${helpRequest.helpSeeker.enteredBy.zipCode} ${helpRequest.helpSeeker.enteredBy.city}`}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>

              <Card className="request-card">
                <h4>Weitere Informationen</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Auftrag erstellt:</td>
                      <td>{dateTransform(helpRequest.createdAt)}</td>
                    </tr>
                    <tr>
                      <td>Auftrag angenommen:</td>
                      <td>{dateTransform(helpRequest.updatedAt)}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>

            <div className="request-cards-container button-group">
              <Button type="primary" danger onClick={cancelHelpRequest}>Auftrag freigeben</Button>
              <Button type="primary" onClick={finishHelpRequest}>Auftrag abschließen</Button>
            </div>
          </>
        )
      }
    </div>
  );
}
