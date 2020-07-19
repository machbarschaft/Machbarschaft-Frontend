import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthenticationContext from '../../contexts/authentication';
import PropTypes from 'prop-types';

const LandingPage = React.lazy(() =>
  import('../../components/landingPage/landingPage')
);
const Dashboard = React.lazy(() =>
  import('../../components/dashboard/dashboard')
);
const Examples = React.lazy(() => import('../../components/examples/examples'));
const Login = React.lazy(() => import('../../components/login/login'));
const ResetPassword = React.lazy(() =>
  import('../../components/resetPassword/resetPassword')
);
const PlaceRequest = React.lazy(() =>
  import('../../components/seekHelp/place-request')
);
const AcceptRequest = React.lazy(() =>
  import('../../components/acceptHelp/acceptRequest')
);
const RegisterHelper = React.lazy(() =>
  import('../../components/register/register-helper-component')
);
const ValidatePhone = React.lazy(() =>
  import('../../components/validation/validate-phone-component')
);
const Settings = React.lazy( () =>
    import('../../components/base/settings')
);
const VerifyMail = React.lazy(() =>
  import('../../components/validation/verify-mail-component')
);
const Contact = React.lazy(() => import('../../components/contact/contact'));

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
              <Redirect to={'/dashboard'} />
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
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/telefon-bestaetigen" component={ValidatePhone} />
      <Route exact path="/einstellungen" render={(props) => (
          <RouteAuthenticated
              render={() => <Settings {...props} />}
              redirectTo="/login"
          />
      )}
      />
      <Route path="/email-bestaetigen" component={VerifyMail} />
      <Route path="/contact" component={Contact} />
      <Route
        exaxct
        path="/place-request"
        render={(props) => <PlaceRequest {...props} />}
      />
      <Route
        path="/accept-request"
        render={(props) => (
          <RouteAuthenticated
            render={() => <AcceptRequest {...props} />}
            redirectTo="/login"
          />
        )}
      />
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
