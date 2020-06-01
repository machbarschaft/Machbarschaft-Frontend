import React from 'react'
import {Typography, Button, Divider, Space} from 'antd';

const {Title, Text, Paragraph} = Typography;

export default function UseStateExample() {
    const [state, setState] = React.useState(true);

    return (
        <React.Fragment>
            <Title level={3}>React.useState</Title>
            <Paragraph>
                <Text>Der aktuelle Wert von <Text code>state</Text> ist <Text code>{state ? "TRUE" : "FALSE"}</Text></Text>
            </Paragraph>
            <Space>
                <Button
                    type={"primary"}
                    onClick={() => setState((curState) => !curState)}
                >Toggle</Button>
                <Button
                    type={"primary"}
                    onClick={() => setState(false)}
                >Set to <Text code>FALSE</Text></Button>
            </Space>

        </React.Fragment>
    )
}