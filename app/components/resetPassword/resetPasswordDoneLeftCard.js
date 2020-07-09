import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

export default function ResetPasswordDoneLeftCard() {
  return (
    <Result
      status="success"
      title="Das Passwort wurde erfolgreich zurückgesetzt!"
      subTitle="Sie können sich jetzt einloggen, klicken Sie dazu auf den Login Button:"
      extra={[
        <Link to="/login" key="login"><Button type="primary">Jetzt einloggen</Button></Link>,
      ]}
    />
  );
}
