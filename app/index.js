import React from 'react'
import ReactDOM from 'react-dom'

import { Typography, Layout, Menu, Space } from 'antd';

import './index.css'
import "antd/dist/antd.css";

import MachbarschaftLogo from './machbarschaft-logo.png';
import DashboardWindow from './dashboard.js';
import PlaceRequestdWindow from './place-request.js';
import HelpWindow from './help.js';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

function App() {
    //
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="nav-logo-container"><img className="nav-logo" src={MachbarschaftLogo} /></div>
                <Menu theme="dark" mode="horizontal" style={{marginLeft: '14em'}} defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">AUFTRÄGE</Menu.Item>
                    <Menu.Item key="2">AUFTRAG AUFGEBEN</Menu.Item>
                    <Menu.Item key="3">BRAUCHEN SIE HILFE?</Menu.Item>
                </Menu>
            </Header>
            <div className="site-layout">
                <div className="main-content">
                    Content, place DashboardWindow, PlaceRequestdWindow, HelpWindow here
                </div>

                <footer>
                    <Space>
                        <a href="#">FAQ</a>
                        <a href="#">Datenschutz</a>
                        <a href="#">Impressum</a>
                    </Space>
                </footer>
            </div>
        </Layout>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)