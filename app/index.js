import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import "antd/dist/antd.less";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Typography, Layout} from 'antd';

import Navigation from "./components/base/navigation";
import Footer from "./components/base/footer";

const LandingPage = React.lazy(() => import("./components/landingPage/landingPage"))
const Dashboard = React.lazy(() => import("./components/dashboard/dashboard"))
const Examples = React.lazy(() => import("./components/examples/examples"))
const AcceptRequest = React.lazy(() => import("./components/acceptHelp/acceptRequest"))

function App() {
    return (
        <Router>
            <Layout>
                <Navigation/>

                <div className="site-layout">
                    <div className="main-content">
                        <React.Suspense fallback={<p>Lädt...</p>}>
                            <Switch>
                                <Route exact path='/' component={LandingPage}/>
                                <Route exact path='/dashboard' component={Dashboard}/>
                                <Route exact path='/examples' component={Examples}/>
                                <Route exact path='/acceptrequest' component={AcceptRequest}/>
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