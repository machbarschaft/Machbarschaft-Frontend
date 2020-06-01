import React from 'react'
import {Typography, Button, Space} from 'antd';

const {Title, Paragraph, Text} = Typography;

function reducerFunction(state, action) {
    if (action.type === "success") {
        return {
            ...state,
            error: null,
            data: "Some Data"
        }
    } else if (action.type === "error") {
        return {
            ...state,
            error: "Some Error",
            data: null
        }
    } else {
        throw new Error("Unsupported")
    }
}

export default function UseReducerExample() {
    const [state, dispatch] = React.useReducer(
        reducerFunction,
        {
            error: null,
            data: null
        }
    )

    const isLoading = state.error === null && state.data === null


    return (
        <React.Fragment>
            <Title level={3}>React.useReducer</Title>
            <Paragraph>
                {isLoading && <Text>Lädt...</Text>}
                {state.error !== null && <Text>Error: {state.error}</Text>}
                {state.data !== null && <Text>Success: {state.data}</Text>}
            </Paragraph>
            <Space>
                <Button
                    type={"primary"}
                    onClick={() => dispatch({
                        type: "success"
                    })}
                >Success</Button>
                <Button
                    type={"danger"}
                    onClick={() => dispatch({
                        type: "error"
                    })}
                >Error</Button>
            </Space>
        </React.Fragment>
    )
}