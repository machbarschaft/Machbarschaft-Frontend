import React from 'react'
import ReactDOM from 'react-dom'

import { Typography } from 'antd';

import './index.css'
import "antd/dist/antd.css";

const { Title } = Typography;

function App() {
    return (
        <Title>Hello World!</Title>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)