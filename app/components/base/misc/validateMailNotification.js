import React from 'react';
import { Alert, Button, notification } from 'antd';

export default function ValidateMailNotification() {
  const [buttonState, setButtonState] = React.useState(false);

  const openSuccessNotification = () => {
    notification.success({
      message: 'Fertig',
      description:
        'Die E-Mail zur Bestätigung deiner E-Mail Adresse wurde erneut gesendet.',
    });
  };

  const handleSendConfirmation = async () => {
    setButtonState(true);
    // ToDo: API -> Resend confirmation
    openSuccessNotification();
  };

  return (
    <div style={{ padding: '1rem', background: '#F4B3A3' }}>
      <Alert
        message="Bitte bestätige deine E-Mail Adresse"
        description={
          <>
            Bevor du alle Funktionen von Machbarschaft nutzen kannst, musst du
            deine E-Mail Adresse bestätigen. Du hast eine E-Mail von uns
            erhalten.
            <br />
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
