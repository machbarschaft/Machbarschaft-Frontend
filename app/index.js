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
import RoutesComponent from "./utils/routing/routes-component";

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

    if (authenticationState.isInitialLoading) {
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
                                <RoutesComponent/>
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