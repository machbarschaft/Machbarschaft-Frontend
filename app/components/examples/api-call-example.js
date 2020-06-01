import React from 'react'
import {Menu, Typography} from 'antd';
import {fetchUserData} from "../../utils/examples/api";

const {Title, Text} = Typography;

function stateReducer(state, action) {
    if (action.type === "success") {
        return {
            ...state,
            [action.selectedMenu]: action.user,
            error: null
        }
    } else if (action.type === "error") {
        return {
            ...state,
            error: action.error.message
        }
    } else {
        throw new Error("Unsupported")
    }
}

export default function APICallExample() {
    const [selectedMenu, setSelectedMenu] = React.useState("1")

    const [state, dispatch] = React.useReducer(
        stateReducer,
        {
            error: null
        }
    )

    const fetchedUsers = React.useRef([])

    const isLoading = () => !state[selectedMenu] && state.error === null

    React.useEffect(() => {
        if (fetchedUsers.current.includes(selectedMenu) === false) {
            fetchedUsers.current.push(selectedMenu)

            fetchUserData(parseInt(selectedMenu))
                .then((user) => dispatch({type: "success", selectedMenu, user}))
                .catch((error) => dispatch({type: "error", error}))
        }
    }, [fetchedUsers, selectedMenu])

    const handleClick = (e) => {
        setSelectedMenu(e.key)
    }

    return (
        <React.Fragment>
            <Title level={3}>API Call (+ Cache)</Title>
            <Menu onClick={handleClick} selectedKeys={[selectedMenu]} mode="horizontal">
                <Menu.Item key="1">
                    One
                </Menu.Item>
                <Menu.Item key="2">
                    Two
                </Menu.Item>
            </Menu>

            {isLoading() && <Text>Lädt...</Text>}

            {state.error && <Text>Error: {state.error}</Text>}

            {state[selectedMenu] && <Text>Fetched User: {state[selectedMenu].username}</Text>}
        </React.Fragment>
    )
}