import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthenticationContext from '../../contexts/authentication';

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

export default function RoutesComponent() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
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
      <Route
        path="/place-request"
        render={(props) => (
          <RouteAuthenticated
            render={() => <PlaceRequest {...props} />}
            redirectTo="/login"
          />
        )}
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

function RouteAuthenticated({ render, redirectTo }) {
  const authenticationContext = React.useContext(AuthenticationContext);

  if (authenticationContext.isAuthenticated()) {
    return render();
  }
  return <Redirect to={redirectTo} />;
}
