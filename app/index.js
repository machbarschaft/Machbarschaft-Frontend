import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import "antd/dist/antd.less";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Typography, Layout} from 'antd';

import Navigation from "./components/base/navigation";
import Footer from "./components/base/footer";
import useAuthentication from "./hooks/useAuthentication";

const LandingPage = React.lazy(() => import("./components/landingPage/landingPage"))
const Dashboard = React.lazy(() => import("./components/dashboard/dashboard"))
const Examples = React.lazy(() => import("./components/examples/examples"))
const Login = React.lazy(() => import("./components/login/login"))

function App() {
    const [authenticationState, {
        verifyAuthentication,
        checkAuthentication,
        invalidateAuthentication
    }] = useAuthentication();
    const authProps = {
        authenticationState: authenticationState,
        verifyAuthentication: verifyAuthentication,
        checkAuthentication: checkAuthentication,
        invalidateAuthentication: invalidateAuthentication
    };

    return (
        <Router>
            <Layout>
                <Navigation {...authProps} />

                <div className="site-layout">
                    <div className="main-content">
                        <React.Suspense fallback={<p>Lädt...</p>}>
                            <Switch>
                                <Route exact path='/' render={() => <LandingPage {...authProps} />} />
                                <Route exact path='/dashboard' render={() => <Dashboard {...authProps} />} />
                                <Route exact path='/examples' component={Examples}/>
                                <Route exact path='/login' render={() => <Login {...authProps} />} />
                                <Route render={() => <h1>404</h1>}/>
                            </Switch>
                        </React.Suspense>
                    </div>

                    <Footer/>
                </div>

            </Layout>
        </Router>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)