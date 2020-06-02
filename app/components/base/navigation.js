import React from 'react'
import {Col, Row, Button, Layout, Menu, Space} from "antd";
import MachbarschaftLogo from "../../assets/img/logo/machbarschaft-logo.png";
import {NavLink} from "react-router-dom";

const { Header, Content, Footer } = Layout;

function NavigationMenuDefault() {
    return (
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
            <Space size={"large"}>
                <Menu.Item key="1"><NavLink to={"/"} exact={true}>DAS PROJEKT</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to={"/"} exact={true}>SO FUNKTIONIERT'S</NavLink></Menu.Item>
                <Menu.Item key="3"><NavLink to={"/"} exact={true}>ÜBER UNS</NavLink></Menu.Item>
                <Menu.Item key="4"><NavLink to={"/"} exact={true}>FAQ</NavLink></Menu.Item>
                <Menu.Item key="5"><NavLink to={"/"} exact={true}>KONTAKT</NavLink></Menu.Item>
                <Menu.Item key="6"><NavLink to={"/"} exact={true}>DOWNLOAD APP</NavLink></Menu.Item>
                <Menu.Item key="7"><NavLink to={"/"} exact={true}>ALS HELFER REGISTRIEREN</NavLink></Menu.Item>
            </Space>
        </Menu>
    );
}
function NavigationMenuLoggedIn() {
    return (
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
            <Space size={"large"}>
                <Menu.Item key="1"><NavLink to={"/"} exact={true}>DASHBOARD</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to={"/"} exact={true}>AUFTRAG AUFGEBEN</NavLink></Menu.Item>
                <Menu.Item key="3"><NavLink to={"/"} exact={true}>BRAUCHEN SIE HILFE?</NavLink></Menu.Item>
            </Space>
        </Menu>
    );
}

function NavigationProfileIndicator() {
    return (
        <div className="nav-profile-container">
            <NavLink to={"/"} exact={true}>Login</NavLink>
        </div>
    );
}

export default function Navigation() {
    const navMenuDefault = <NavigationMenuDefault />;
    const navMenuLoggedIn = <NavigationMenuLoggedIn />;
    const navProfile = <NavigationProfileIndicator />;
    return (
        <div className="nav-bar">
            <img className="nav-logo" src={MachbarschaftLogo} />
            {navMenuDefault}
            {navProfile}
        </div>
    )
}