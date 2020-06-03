import React from 'react'
import {Col, Row, Button, Layout, Menu, Space} from "antd";
import {MenuOutlined} from '@ant-design/icons';
import MachbarschaftLogo from "../../assets/img/logo/machbarschaft-logo.png";
import {NavLink} from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

const {Header, Content, Footer} = Layout;

function NavigationMenu(props) {
    const {authenticationState} = props

    if (authenticationState.user_id == null) {
        // No User
        return (
            <Menu mode={props.mode} defaultSelectedKeys={['1']} onClick={props.menuClicked}>
                <Menu.Item key="1"><NavLink to={"/"} exact={true}>DAS PROJEKT</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to={"/"} exact={true}>SO FUNKTIONIERT'S</NavLink></Menu.Item>
                <Menu.Item key="3"><NavLink to={"/"} exact={true}>ÜBER UNS</NavLink></Menu.Item>
                <Menu.Item key="4"><NavLink to={"/"} exact={true}>FAQ</NavLink></Menu.Item>
                <Menu.Item key="5"><NavLink to={"/"} exact={true}>KONTAKT</NavLink></Menu.Item>
                <Menu.Item key="6"><NavLink to={"/"} exact={true}>DOWNLOAD APP</NavLink></Menu.Item>
                <Menu.Item key="7"><NavLink to={"/"} exact={true}>ALS HELFER REGISTRIEREN</NavLink></Menu.Item>
            </Menu>
        );
    } else {
        // User
        return (
            <Menu mode={props.mode} defaultSelectedKeys={['1']} onClick={props.menuClicked}>
                <Menu.Item key="1"><NavLink to={"/dashboard"} exact={true}>DASHBOARD</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to={"/"} exact={true}>AUFTRAG AUFGEBEN</NavLink></Menu.Item>
                <Menu.Item key="3"><NavLink to={"/"} exact={true}>BRAUCHEN SIE HILFE?</NavLink></Menu.Item>
            </Menu>
        );
    }


}

function NavigationProfileIndicator() {
    return (
        <div className="nav-profile-container">
            <NavLink to={"/"} exact={true}>Login</NavLink>
        </div>
    );
}

export default function Navigation() {
    const [mobileNavState, setState] = React.useState(false);

    const [authenticationState, {
        checkAuthentication,
        invalidateAuthentication
    }] = useAuthentication()

    return (
        <>
            <div className="nav-bar">
                <MenuOutlined className="nav-menu-mobile-icon" onClick={() => setState(!mobileNavState)}/>
                <img className="nav-logo" src={MachbarschaftLogo}/>
                <div className="nav-menu-desktop">
                    <NavigationMenu mode="horizontal" menuClicked={() => setState(false)} authenticationState={authenticationState}/>
                </div>
                <NavigationProfileIndicator/>
            </div>
            <div className="nav-menu-mobile">
                <div className={"nav-menu-mobile-content " + (mobileNavState ? "nav-menu-mobile-content-open" : "nav-menu-mobile-content-close")}>
                    <NavigationMenu mode="vertical" menuClicked={() => setState(false)} authenticationState={authenticationState}/>
                </div>
            </div>
        </>
    )
}