import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthenticationContext from '../../contexts/authentication';

const LandingPage = React.lazy(() =>
  import('../../containers/LandingPage')
);
const Dashboard = React.lazy(() =>
  import('../../containers/Dashboard')
);
const Login = React.lazy(() =>
  import('../../containers/Login')
);
const ResetPassword = React.lazy(() =>
  import('../../containers/ResetPassword')
);
const PlaceRequest = React.lazy(() =>
  import('../../containers/PlaceRequest')
);
const AcceptRequest = React.lazy(() =>
  import('../../containers/AcceptRequest')
);
const RegisterHelper = React.lazy(() =>
  import('../../containers/RegisterHelper')
);
const ValidatePhone = React.lazy(() =>
  import('../../containers/ValidatePhone')
);
const Settings = React.lazy(() =>
  import('../../containers/Settings')
);
const VerifyMail = React.lazy(() =>
  import('../../containers/VerifyMail')
);
const Contact = React.lazy(() =>
  import('../../containers/Contact')
);
const EditRole = React.lazy(() =>
  import('../../containers/EditRole')
);
const Imprint = React.lazy(() => import('../../containers/Imprint'));
const PrivacyNotice = React.lazy(() =>
  import('../../containers/PrivacyNotice')
);
const Faq = React.lazy(() => import('../../containers/Faq'));

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
      {/*<Route path="/kontakt" component={Contact} />*/}
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
      <Route
        path="/role"
        render={(props) => (
          <RouteAuthenticated
            render={() => <EditRole {...props} />}
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
