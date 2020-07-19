import React from 'react';
import { Alert, Button, notification } from 'antd';
import { getConfirmEmail } from '../../../utils/api/emailApi';

export default function ValidateMailNotification() {
  const [buttonState, setButtonState] = React.useState(false);

  const openSuccessNotification = () => {
    setButtonState(false);
    notification.success({
      message: 'Fertig',
      description:
        'Die E-Mail zur Bestätigung deiner E-Mail Adresse wurde erneut gesendet.',
    });
  };
  const openErrorNotification = () => {
    setButtonState(false);
    notification.error({
      message: 'Fehler',
      description:
        'Die E-Mail zur Bestätigung konnte nicht gesendet werden, bitte versuche es erneut.',
    });
  };

  const handleSendConfirmation = async () => {
    setButtonState(true);
    getConfirmEmail()
      .then(() => openSuccessNotification())
      .catch((err) => {
        openErrorNotification();
        console.log("error: ", err);
      });
  };

  return (
    <div style={{ padding: '1rem', background: '#F4B3A3' }}>
      <Alert
        className="validation-alert"
        message="Bitte bestätige deine E-Mail Adresse"
        description={
          <>
            Bevor du alle Funktionen von Machbarschaft nutzen kannst, musst du
            deine E-Mail Adresse bestätigen. Du hast eine E-Mail von uns
            erhalten.
            <br /><br/>
            <Button
              type="primary"
              loading={buttonState}
              onClick={handleSendConfirmation}
            >
              Bestätigung erneut senden
            </Button>
          </>
        }
        type="info"
        showIcon
      />
    </div>
  );
}
