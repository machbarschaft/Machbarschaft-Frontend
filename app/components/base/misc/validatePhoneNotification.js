import React from 'react';
import { Alert, Button } from 'antd';
import { NavLink } from 'react-router-dom';

export default function ValidatePhoneNotification() {
  return (
    <div style={{ padding: '1rem', background: '#F4B3A3' }}>
      <Alert
        message="Bitte bestätige deine Telefonnummer"
        description={
          <>
            Bevor du alle Funktionen von Machbarschaft nutzen kannst, musst du
            deine Telefonnummer bestätigen.
            <br />
            <Button type={'primary'}>
              <NavLink to="/telefon-bestaetigen" exact>
                Bestätigen
              </NavLink>
            </Button>
          </>
        }
        type="info"
        showIcon
      />
    </div>
  );
}
