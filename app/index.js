import React from 'react'
import ReactDOM from 'react-dom'

import {Typography, Button, Divider} from 'antd';

import './index.css'
import "antd/dist/antd.css";

import Examples from "./components/examples/examples";
const {Title} = Typography;

function App() {
    const [fontSize, attrs] = useFontSizer()

    return (
        <React.Fragment>
            <Examples />
        </React.Fragment>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)