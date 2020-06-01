import React from 'react'
import ThemeContext from "../../contexts/examples/theme";
import {Typography, Button, Divider, Space} from 'antd';

const {Title, Text, Paragraph} = Typography;

export default function ConsumerProviderExample({toggleTheme}) {
    const theme = React.useContext(ThemeContext)

    return(
        <React.Fragment>
            <Title level={3}>Consumer / Provider</Title>
            <Paragraph>
                <Text>Aktueller Stil: {theme}</Text>
            </Paragraph>
            <Button
                type={"primary"}
                onClick={toggleTheme}
            >Toggle</Button>
        </React.Fragment>
    )
}