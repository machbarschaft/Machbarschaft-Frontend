import React from "react"
import {Route, Switch, useHistory, Redirect} from "react-router-dom";
import AuthenticationContext from "../../contexts/authentication";

const LandingPage = React.lazy(() => import("../../components/landingPage/landingPage"))
const Dashboard = React.lazy(() => import("../../components/dashboard/dashboard"))
const Examples = React.lazy(() => import("../../components/examples/examples"))
const Login = React.lazy(() => import("../../components/login/login"))
const ResetPassword = React.lazy(() => import("../../components/resetPassword/resetPassword"))
const PlaceRequest = React.lazy(() => import("../../components/seekHelp/place-request"))
const AcceptRequest = React.lazy(() => import("../../components/acceptHelp/acceptRequest"))
const RegisterHelper = React.lazy(() => import("../../components/register/register-helper-component"))

export default function RoutesComponent() {
    return (
        <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/dashboard' render={() => <RouteAuthenticated component={Dashboard} redirectTo={"/login"}/>}/>
            <Route path='/examples' component={Examples}/>
            <Route path='/login' component={Login}/>
            <Route path='/resetpassword' component={ResetPassword}/>
            <Route path='/place-request' render={() => <RouteAuthenticated component={PlaceRequest} redirectTo={"/login"}/>}/>
            <Route path='/accept-request' render={() => <RouteAuthenticated component={AcceptRequest} redirectTo={"/login"}/>}/>
            <Route path='/registrieren' component={RegisterHelper}/>
            <Route render={() => <h1>404</h1>}/>
        </Switch>
    )
}

function RouteAuthenticated({component, redirectTo}) {
    const authenticationContext = React.useContext(AuthenticationContext);

    return (
        authenticationContext.isAuthenticated() ?
            component : <Redirect to={redirectTo}/>
    )
}