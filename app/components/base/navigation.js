import React from 'react';
import { Button, Menu, Popover, Space, Typography } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MachbarschaftLogo from '../../assets/img/logo/machbarschaft-logo.png';
import AuthenticationContext from '../../contexts/authentication';

const { Text } = Typography;

function NavigationMenu({ mode, menuClicked }) {
  const authProps = React.useContext(AuthenticationContext);
  const { authenticationState } = authProps;
  const location = useLocation();
  const [selectedKey, setSelectedKey] = React.useState([location.pathname]);
  const isAdmin = authenticationState.role === 'ADMIN';

  React.useEffect(() => setSelectedKey(location.pathname), [location.pathname]);

  if (authenticationState.uid == null) {
    // No User
    return (
      <></>
    );
  }
  // User
  return (
    <Menu
      mode={mode}
      defaultSelectedKeys={[
        window.location.pathname === '/'
          ? '/dashboard'
          : window.location.pathname,
      ]}
      selectedKeys={[selectedKey]}
      onClick={menuClicked}
    >
      <Menu.Item key="/dashboard">
        <NavLink to="/dashboard" exact>
          ÜBERSICHT
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/auftrag-aufgeben">
        <NavLink to="/auftrag-aufgeben" exact>
          AUFTRAG AUFGEBEN
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/auftrag-annehmen">
        <NavLink to="/auftrag-annehmen" exact>
          AUFTRAG ANNEHMEN
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/auftrage">
        <NavLink to="/auftrage" exact>
          AUFTRÄGE
        </NavLink>
      </Menu.Item>
      {
        isAdmin && (
          <Menu.Item key="/role">
            <NavLink to="/role" exact>
              ROLLEN BEARBEITEN
            </NavLink>
          </Menu.Item>
        )
      }
      {
        isAdmin && (
          <Menu.Item key="/admins">
            <NavLink to="/admins" exact>
              ADMIN DASHBOARD
            </NavLink>
          </Menu.Item>
        )
      }
      {/*<Menu.Item key="/kontakt">*/}
      {/*  <NavLink to="/kontakt" exact>*/}
      {/*    BRAUCHEN SIE HILFE?*/}
      {/*  </NavLink>*/}
      {/*</Menu.Item>*/}
    </Menu>
  );
}

NavigationMenu.propTypes = {
  mode: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  menuClicked: PropTypes.func.isRequired,
};

function NavigationFontResizer({ increaseFontSize, decreaseFontSize }) {
  return (
    <>
      <Button className="font-sizer-button" onClick={increaseFontSize}>
        +
      </Button>
      <Button className="font-sizer-button" onClick={decreaseFontSize}>
        -
      </Button>
    </>
  );
}

NavigationFontResizer.propTypes = {
  increaseFontSize: PropTypes.func.isRequired,
  decreaseFontSize: PropTypes.func.isRequired,
};

function NavigationProfileIndicator() {
  const authProps = React.useContext(AuthenticationContext);

  const popoverContent = (
    <>
      <Space direction="vertical">
        <NavLink to="/einstellungen" exact>
          Einstellungen
        </NavLink>
        <NavLink
          to="/"
          onClick={() => authProps.invalidateAuthentication()}
          exact
        >
          Logout
        </NavLink>
      </Space>
    </>
  );

  return (
    <div className="profile-spacing-left">
      {!authProps.isAuthenticated() ? (
        <NavLink to="/login" exact>
          <Text strong style={{ fontSize: '120%' }}>
            Login
          </Text>
        </NavLink>
      ) : (
        <Popover
          content={popoverContent}
          placement="topRight"
          title=""
          trigger="click"
        >
          <Button shape="circle" size="large" icon={<UserOutlined />} />
        </Popover>
      )}
    </div>
  );
}

export default function Navigation({ increaseFontSize, decreaseFontSize }) {
  const authProps = React.useContext(AuthenticationContext);
  const { authenticationState } = authProps;
  const [mobileNavState, setState] = React.useState(false);
  const history = useHistory();

  return (
    <>
      <div className="nav-bar">
        <div className={`nav-menu-mobile-icon-container ${authenticationState.uid === null ? 'visibility-hidden' : ''}`}>
          <MenuOutlined
            className="nav-menu-mobile-icon"
            onClick={() => setState(!mobileNavState)}
          />
        </div>
        <img className="nav-logo" src={MachbarschaftLogo} alt="" onClick={() => history.push('/')}/>
        <div className="nav-menu-desktop">
          <NavigationMenu
            mode="horizontal"
            menuClicked={() => setState(false)}
          />
        </div>
        <div className="nav-profile-container">
          <NavigationFontResizer
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
          />
          <NavigationProfileIndicator />
        </div>
      </div>
      <div className="nav-menu-mobile">
        <div
          className={`nav-menu-mobile-content ${
            mobileNavState
              ? 'nav-menu-mobile-content-open'
              : 'nav-menu-mobile-content-close'
          }`}
        >
          <NavigationMenu mode="vertical" menuClicked={() => setState(false)} />
        </div>
      </div>
    </>
  );
}
Navigation.propTypes = {
  increaseFontSize: PropTypes.func.isRequired,
  decreaseFontSize: PropTypes.func.isRequired,
};
