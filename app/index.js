import React from 'react'
import ReactDOM from 'react-dom'

import {Typography, Button} from 'antd';

import './index.css'
import "antd/dist/antd.css";
import useFontSizer from "./hooks/useFontSizer";

const {Title} = Typography;

function App() {
    const [fontSize, attrs] = useFontSizer()

    return (
        <React.Fragment>
            {/* Trick from https://stackoverflow.com/a/45669262 */}
            <div ref={(node) => {
                if (node) {
                    node.style.setProperty("font-size", `${fontSize}%`, "important");
                }
            }}>
                <Title>Hello World!</Title>
                <p>Test</p>
            </div>
            <Button onClick={attrs.increaseFontSize}>+</Button>
            <Button onClick={attrs.decreaseFontSize}>-</Button>
        </React.Fragment>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)