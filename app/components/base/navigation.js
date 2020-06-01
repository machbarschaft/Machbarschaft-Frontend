import React from 'react'
import {Col, Row, Button, Layout, Menu, Space} from "antd";
import MachbarschaftLogo from "../../assets/img/logo/machbarschaft-logo.png";

const { Header, Content, Footer } = Layout;

export default function Navigation() {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="nav-logo-container"><img className="nav-logo" src={MachbarschaftLogo} /></div>

            <Menu theme={"dark"} mode="horizontal" style={{marginLeft: '14em'}} defaultSelectedKeys={['1']}>
                <Menu.Item key="1">AUFTRÄGE</Menu.Item>
                <Menu.Item key="2">AUFTRAG AUFGEBEN</Menu.Item>
                <Menu.Item key="3">BRAUCHEN SIE HILFE?</Menu.Item>
            </Menu>
        </Header>
    )
}