import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import "antd/dist/antd.less";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Typography, Layout} from 'antd';

import Navigation from "./components/base/navigation";
import Footer from "./components/base/footer";
import useAuthentication from "./hooks/useAuthentication";
import AuthenticationContext, {AuthenticationProvider} from "./contexts/authentication";
import Loading from "react-fullscreen-loading";

const LandingPage = React.lazy(() => import("./components/landingPage/landingPage"))
const Dashboard = React.lazy(() => import("./components/dashboard/dashboard"))
const Examples = React.lazy(() => import("./components/examples/examples"))
const Login = React.lazy(() => import("./components/login/login"))
const ResetPassword = React.lazy(() => import("./components/resetPassword/resetPassword"))
const PlaceRequest = React.lazy(() => import("./components/seekHelp/place-request"))


function App() {
    const [authenticationState, {
        performAuthentication,
        checkAuthentication,
        invalidateAuthentication,
        isAuthenticated
    }] = useAuthentication();
    const authProps = {
        authenticationState: authenticationState,
        performAuthentication: performAuthentication,
        checkAuthentication: checkAuthentication,
        invalidateAuthentication: invalidateAuthentication,
        isAuthenticated: isAuthenticated
    };

    if(authenticationState.isInitialLoading) {
        return <Loading loading={true} background={"#F4B3A3"} loaderColor={"#2D3047"}/>;
    }

    return (
        <Router>
            <AuthenticationProvider value={authProps}>
                <Layout>
                    <Navigation/>

                    <div className="site-layout">
                        <div className="main-content">
                            <React.Suspense fallback={<p>Lädt...</p>}>
                                <Switch>
                                    <Route exact path='/' render={(props) => <LandingPage {...props} />}/>
                                    <Route exact path='/dashboard' render={(props) => <Dashboard {...props} />}/>
                                    <Route path='/examples' component={Examples}/>
                                    <Route exact path='/login' render={(props) => <Login {...props} />}/>
                                    <Route exact path='/resetpassword' render={(props) => <ResetPassword {...props} />}/>
                                    <Route path='/place-request' render={(props) => <PlaceRequest {...props} />}/>

                                    <Route render={(props) => <h1>404</h1>}/>
                                </Switch>
                            </React.Suspense>
                        </div>

                        <Footer/>
                    </div>

                </Layout>
            </AuthenticationProvider>
        </Router>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)