import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.less';

import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

import Loading from 'react-fullscreen-loading';
import Navigation from './components/base/navigation';
import Footer from './components/base/footer';
import useAuthentication from './hooks/useAuthentication';
import AuthenticationContext, { AuthenticationProvider } from './contexts/authentication';
import RoutesComponent from './utils/routing/routes-component';

function App() {
  const [authenticationState, {
    performAuthentication,
    checkAuthentication,
    invalidateAuthentication,
    isAuthenticated,
    performRegister,
  }] = useAuthentication();
  const authProps = {
    authenticationState,
    performAuthentication,
    checkAuthentication,
    invalidateAuthentication,
    isAuthenticated,
    performRegister,
  };

  if (authenticationState.isInitialLoading) {
    return <Loading loading background="#F4B3A3" loaderColor="#2D3047" />;
  }

  return (
    <Router>
      <AuthenticationProvider value={authProps}>
        <Layout>
          <Navigation />
          <div className="site-layout">
            <div className="main-content">
              <React.Suspense fallback={<p>Lädt...</p>}>
                <RoutesComponent />
              </React.Suspense>
            </div>

            <Footer />
          </div>

        </Layout>
      </AuthenticationProvider>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
