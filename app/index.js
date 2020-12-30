import { Layout, Result, Spin } from 'antd';
import 'antd/dist/antd.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Loading from 'react-fullscreen-loading';
import { BrowserRouter as Router } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Footer from './components/base/footer';
import ValidateMailNotification from './components/base/misc/validateMailNotification';
import ValidatePhoneNotification from './components/base/misc/validatePhoneNotification';
import Navigation from './components/base/navigation';
import firebase, { FirebaseContext } from './components/firebase';
import { AuthenticationProvider } from './contexts/authentication';
import useAuthentication from './hooks/useAuthentication';
import useFontSizer from './hooks/useFontSizer';
import './index.css';
import RoutesComponent from './utils/routing/routes-component';

function App() {
  const [
    authenticationState,
    {
      performAuthentication,
      checkAuthentication,
      invalidateAuthentication,
      isAuthenticated,
      isMailVerified,
      isPhoneVerified,
      performRegister,
    },
  ] = useAuthentication();
  const authProps = {
    authenticationState,
    performAuthentication,
    checkAuthentication,
    invalidateAuthentication,
    isAuthenticated,
    isMailVerified,
    isPhoneVerified,
    performRegister,
  };
  const [fontSize, fontSizerAttrs] = useFontSizer();

  if (authenticationState.isInitialLoading) {
    return <Loading loading background="#F4B3A3" loaderColor="#2D3047" />;
  }

  return (
    <Router>
      <FirebaseContext.Provider value={firebase}>
        <AuthenticationProvider value={authProps}>
          <Layout>
            <Navigation
              increaseFontSize={fontSizerAttrs.increaseFontSize}
              decreaseFontSize={fontSizerAttrs.decreaseFontSize}
            />
            <div className="site-layout">
              <div className="main-content">
                <div
                  ref={(node) => {
                    if (node) {
                      node.style.setProperty(
                        'font-size',
                        `${fontSize}em`,
                        'important'
                      );
                    }
                  }}
                >
                  {isAuthenticated() && !isMailVerified() && (
                    <ValidateMailNotification />
                  )}
                  {isAuthenticated() && !isPhoneVerified() && (
                    <ValidatePhoneNotification />
                  )}

                  <React.Suspense
                    fallback={<Result icon={<Spin size="large" />} />}
                  >
                    <RoutesComponent />
                  </React.Suspense>
                </div>
              </div>

              <Footer />
            </div>
          </Layout>
        </AuthenticationProvider>
      </FirebaseContext.Provider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
