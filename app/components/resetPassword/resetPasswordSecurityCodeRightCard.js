import React from 'react';
import { Button, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Text } = Typography;

function ResetPasswordSecurityCodeRightCard({ user }) {
  const [loadingState, setLoadingState] = React.useState(false);

  function sendRequest() {
    setLoadingState(true);
    console.log(`ToDo: send reset request for user '${user}' to backend`);
    setTimeout(() => {
      setLoadingState(false);
      message.success('Anfrage erfolgreich verschickt!');
    }, 1000);
  }

  return (
    <>
      Die Anfrage wurde erfolgreich verschickt!
      <br />
      Sobald Sie den Code per E-Mail oder Telefon erhalten haben, geben Sie
      diesen bitte im Eingabefeld ein und klicken{' '}
      <Text strong>Code bestätigen</Text>
      .
      <br />
      <br />
      Wenn keine E-Mail angekommen oder kein Telefonanruf eingegangen ist, dann
      klicken Sie bitte hier:
      <br />
      <br />
      <Button onClick={() => sendRequest()} loading={loadingState}>
        Anfrage erneut senden
      </Button>
    </>
  );
}

ResetPasswordSecurityCodeRightCard.propTypes = {
  user: PropTypes.string.isRequired,
};

export default ResetPasswordSecurityCodeRightCard;
