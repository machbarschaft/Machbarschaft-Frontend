import React from 'react'
import ReactDOM from 'react-dom'

import {Typography, Layout, Menu, Space} from 'antd';

import './index.css'
import "antd/dist/antd.css";

import Navigation from "./components/base/navigation";
import Footer from "./components/base/footer";

const {Title} = Typography;
const {Header, Content} = Layout;

function App() {
    //
    return (
        <Layout>
            <Navigation/>

            <div className="site-layout">
                <div className="main-content">
                    Content, place DashboardWindow, PlaceRequestdWindow, HelpWindow here
                </div>

                <Footer/>
            </div>

        </Layout>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)