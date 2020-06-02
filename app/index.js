import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import "antd/dist/antd.less";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Typography, Layout, Menu, Space} from 'antd';

import Navigation from "./components/base/navigation";
import Footer from "./components/base/footer";

const {Title} = Typography;
const {Header, Content} = Layout;

const LandingPage = React.lazy(() => import("./components/landingPage/landingPage"))
const Dashboard = React.lazy(() => import("./components/dashboard/dashboard"))

//import Examples from "./components/examples/examples";

function App() {
    // for viewing examples:
    /*
        <React.Fragment>
            <Examples />
        </React.Fragment>
    */
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