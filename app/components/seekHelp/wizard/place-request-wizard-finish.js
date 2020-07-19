import React from 'react';
import { Button, Result, Typography } from 'antd';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AuthenticationContext from '../../../contexts/authentication';
import RegisterHelpseekerComponent from '../../register/register-helpseeker-component';

const { Title } = Typography;
/**
 * Optional component of seek help wizard. Used, if user account has been found.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardFinish({
  handlePreviousPage,
  handleNextPage,
  wizardState,
  formData,
  phoneNumber,
  countryCode,
}) {
  const authenticationContext = React.useContext(AuthenticationContext);

  const userExistsContent = () => <Title level={4}>Logge dich ein!</Title>;

  const userNotExistsContent = () => (
    <Title level={4}>Erstellen Sie jetzt ein Benutzerkonto!</Title>
  );

  return (
    <>
      <Result
        status="success"
        title="Ihre Anfrage wurde entgegengenommen."
        subTitle="Unser Netzwerk aus freiwilligen Helferinnen und Helfern wurde benachrichtigt. Sie erhalten in Kürze eine Rückmeldung."
        extra={[
          <NavLink to="/">
            <Button>Zurück zur Startseite</Button>
          </NavLink>,
        ]}
      />
      <RegisterHelpseekerComponent
        countryCode={countryCode}
        phone={phoneNumber}
        surname={formData.current['place-request-wizard-name'].surname}
        forename={formData.current['place-request-wizard-name'].forename}
      />
    </>
  );
}

PlaceRequestWizardFinish.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
};
