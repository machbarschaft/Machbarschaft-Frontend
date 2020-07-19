import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthenticationContext from '../../contexts/authentication';

const LandingPage = React.lazy(() =>
  import('../../components/landingPage/landingPage')
);
const Dashboard = React.lazy(() =>
  import('../../components/dashboard/dashboard-component')
);
const Login = React.lazy(() =>
  import('../../components/login/login-component')
);
const ResetPassword = React.lazy(() =>
  import('../../components/resetPassword/resetPassword-component')
);
const PlaceRequest = React.lazy(() =>
  import('../../components/seekHelp/place-request-component')
);
const AcceptRequest = React.lazy(() =>
  import('../../components/acceptHelp/acceptRequest-component')
);
const RegisterHelper = React.lazy(() =>
  import('../../components/register/register-helper-component')
);
const ValidatePhone = React.lazy(() =>
  import('../../components/validation/validate-phone-component')
);
const Settings = React.lazy(() =>
  import('../../components/base/settings-component')
);
const VerifyMail = React.lazy(() =>
  import('../../components/validation/verify-mail-component')
);
const Contact = React.lazy(() =>
  import('../../components/contact/contact-component')
);
const Imprint = React.lazy(() => import('../../components/misc/imprint'));
const PrivacyNotice = React.lazy(() =>
  import('../../components/misc/privacy-notice')
);
const Faq = React.lazy(() => import('../../components/misc/faq'));

export default function RoutesComponent() {
  const authProps = React.useContext(AuthenticationContext);
  const { authenticationState } = authProps;

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <>
            {authenticationState.uid === null ? (
              <LandingPage />
            ) : (
              <Redirect to="/dashboard" />
            )}
          </>
        )}
      />
      <Route
        path="/dashboard"
        render={(props) => (
          <RouteAuthenticated
            render={() => <Dashboard {...props} />}
            redirectTo="/login"
          />
        )}
      />
      <Route path="/examples" component={Examples} />
      <Route path="/login" component={Login} />
      <Route path="/registrieren" component={RegisterHelper} />
      <Route path="/passwort-zuruecksetzen" component={ResetPassword} />
      <Route path="/telefon-bestaetigen" component={ValidatePhone} />
      <Route
        exact
        path="/einstellungen"
        render={(props) => (
          <RouteAuthenticated
            render={() => <Settings {...props} />}
            redirectTo="/login"
          />
        )}
      />
      <Route path="/email-bestaetigen" component={VerifyMail} />
      <Route path="/kontakt" component={Contact} />
      <Route
        exaxct
        path="/auftrag-aufgeben"
        render={(props) => <PlaceRequest {...props} />}
      />
      <Route
        path="/auftrag-annehmen"
        render={(props) => (
          <RouteAuthenticated
            render={() => <AcceptRequest {...props} />}
            redirectTo="/login"
          />
        )}
      />
      <Route path="/impressum" component={Imprint} />
      <Route path="/datenschutz" component={PrivacyNotice} />
      <Route path="/faq" component={Faq} />
      <Route render={() => <h1>404</h1>} />
    </Switch>
  );
}

function RouteAuthenticated({ render, redirectTo, needVerified = false }) {
  const authenticationContext = React.useContext(AuthenticationContext);

  if (authenticationContext.isAuthenticated()) {
    if (
      needVerified &&
      (!authenticationContext.isMailVerified() ||
        !authenticationContext.isPhoneVerified())
    ) {
      return <Redirect to={redirectTo} />;
    }

    return render();
  }
  return <Redirect to={redirectTo} />;
}

RouteAuthenticated.propTypes = {
  render: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
  needVerified: PropTypes.bool,
};
