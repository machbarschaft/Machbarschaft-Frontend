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

export default function RoutesComponent() {
    return (
        <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/dashboard' render={() => <RouteAuthenticated component={Dashboard} redirectTo={"/login"}/>}/>
            <Route path='/examples' component={Examples}/>
            <Route path='/login' component={Login}/>
            <Route path='/resetpassword' component={ResetPassword}/>
            <Route path='/place-request' render={(props) => <RouteAuthenticated component={() => <PlaceRequest {...props } />} redirectTo={"/login"}/>}/>
            <Route path='/place-request2' component={PlaceRequest}/>
            <Route path='/accept-request' render={() => <RouteAuthenticated component={AcceptRequest} redirectTo={"/login"}/>}/>

            <Route render={() => <h1>404</h1>}/>
        </Switch>
    )
}

function RouteAuthenticated({component, redirectTo}) {
    const authenticationContext = React.useContext(AuthenticationContext);

    if(authenticationContext.isAuthenticated()) {
        return component()
    } else {
        return <Redirect to={redirectTo} />
    }
}