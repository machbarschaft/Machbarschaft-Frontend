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

const LandingPage = React.lazy(() => import("./components/landingPage/landingPage"))
const Dashboard = React.lazy(() => import("./components/dashboard/dashboard"))
const Examples = React.lazy(() => import("./components/examples/examples"))
const AcceptRequest = React.lazy(() => import("./components/acceptHelp/acceptRequest"))
const Login = React.lazy(() => import("./components/login/login"))
const ResetPassword = React.lazy(() => import("./components/resetPassword/resetPassword"))

function App() {
    const [authenticationState, {
        performAuthentication,
        checkAuthentication,
        invalidateAuthentication
    }] = useAuthentication();
    const authProps = {
        authenticationState: authenticationState,
        performAuthentication: performAuthentication,
        checkAuthentication: checkAuthentication,
        invalidateAuthentication: invalidateAuthentication
    };

    return (
        <Router>
            <AuthenticationProvider value={authProps}>
                <Layout>
                    <Navigation/>
                    <div className="site-layout">
                        <div className="main-content">
                            <React.Suspense fallback={<p>Lädt...</p>}>
                                <Switch>
                                    <Route exact path='/' render={(props) => <LandingPage {...props} />} />
                                    <Route exact path='/dashboard' render={(props) => <Dashboard {...props} />} />
                                    <Route exact path='/examples' component={Examples}/>
                                    <Route exact path='/login' render={(props) => <Login {...props} />} />
                                    <Route exact path='/resetpassword' render={(props) => <ResetPassword {...props} />} />
                                    <Route exact path='/acceptrequest' component={AcceptRequest}/>
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