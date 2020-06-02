import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {Typography, Layout, Menu, Space} from 'antd';

import './index.css'
import "antd/dist/antd.less";

import Navigation from "./components/base/navigation";
import Footer from "./components/base/footer";

const {Title} = Typography;
const {Header, Content} = Layout;

const LandingPage = React.lazy(() => import("./components/landingPage/landingPage"))
const Dashboard = React.lazy(() => import("./components/dashboard/dashboard"))

function App() {
    //
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