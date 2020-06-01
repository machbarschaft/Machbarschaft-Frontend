import React from 'react'
import {Space} from "antd";
import {NavLink} from "react-router-dom";

export default function NavigationExample() {
    return (
        <React.Fragment>
            <Space>
                <NavLink to={"/examples/use-state"} exact={true}>React.useState</NavLink>
                <NavLink to={"/examples/use-effect"} exact={true}>React.useEffect</NavLink>
                <NavLink to={"/examples/use-reducer"} exact={true}>React.useReducer</NavLink>
                <NavLink to={"/examples/api-call"} exact={true}>API Call</NavLink>
                <NavLink to={"/examples/consumer-provider"} exact={true}>Consumer / Provider</NavLink>
                <NavLink to={"/examples/custom-hook"} exact={true}>Custom Hooks</NavLink>
                <NavLink to={"/examples/form"} exact={true}>Forms</NavLink>

            </Space>
        </React.Fragment>
    )
}