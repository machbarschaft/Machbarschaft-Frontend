import React from 'react';
import { Button, Result, Typography, Card } from 'antd';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import RegisterHelpseekerComponent from '../../register/register-helpseeker-component';
import LoginWindow from '../../login/login';

/**
 * Optional component of seek help wizard. Used, if user account has been found.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardFinish({
  formData,
  phoneNumber,
  countryCode,
}) {
  const [viewState, setViewState] = React.useState('initial');

  return (
    <>
      <Result
        status="success"
        title="Ihre Anfrage wurde entgegengenommen."
        subTitle="Unser Netzwerk aus freiwilligen Helferinnen und Helfern wurde benachrichtigt. Sie erhalten in Kürze eine Rückmeldung."
        extra={[
          <NavLink to="/" key="/">
            <Button>Zurück zur Startseite</Button>
          </NavLink>,
        ]}
      />
      <div className="dashboard-spacing" />
      {viewState === 'initial' && (
        <Card
          bodyStyle={{ textAlign: 'center' }}
          bordered={false}
          className="login-card"
        >
          Um den Status Ihres Auftrags auf dieser Webseite zu sehen, können Sie
          sich hier registrieren:
          <br />
          <Button type="primary" onClick={() => setViewState('register')}>
            Registrieren
          </Button>
          <br />
          <br />
          Wenn Sie bereits einen Account haben, können Sie sich hier einloggen:
          <br />
          <Button type="primary" onClick={() => setViewState('login')}>
            Einloggen
          </Button>
        </Card>
      )}
      {viewState !== 'initial' && (
        <div className="centered">
          <Button type="primary" onClick={() => setViewState('initial')}>
            Abbrechen
          </Button>
        </div>
      )}
      <div className="dashboard-spacing" />
      {viewState === 'register' && (
        <RegisterHelpseekerComponent
          countryCode={countryCode}
          phone={phoneNumber}
          surname={
            formData && formData.current['place-request-wizard-name'].surname
          }
          forename={
            formData && formData.current['place-request-wizard-name'].forename
          }
        />
      )}
      {viewState === 'login' && <LoginWindow showRegister={false} />}
    </>
  );
}

PlaceRequestWizardFinish.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  countryCode: PropTypes.number.isRequired,
};
