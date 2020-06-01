import React from 'react'
import {Col, Row, Button, Layout, Menu, Space} from "antd";
import MachbarschaftLogo from "../../assets/img/logo/machbarschaft-logo.png";
import {NavLink} from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default function Navigation() {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="nav-logo-container"><img className="nav-logo" src={MachbarschaftLogo} /></div>

            <Menu theme={"dark"} mode="horizontal" style={{marginLeft: '14em'}} defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><NavLink to={"/"} exact={true}>STARTSEITE</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to={"/dashboard"} exact={true}>DASHBOARD</NavLink></Menu.Item>
                <Menu.Item key="3">BRAUCHEN SIE HILFE?</Menu.Item>
            </Menu>
        </Header>
    )
}