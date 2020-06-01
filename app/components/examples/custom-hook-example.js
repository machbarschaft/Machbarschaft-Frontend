import React from 'react'
import useHover from "../../hooks/examples/useHover";
import {Typography, Button, Divider, Space} from 'antd';

const {Paragraph, Title, Text} = Typography

export default function CustomHookExample() {
    const [hovering, attributes] = useHover()

    return (
        <React.Fragment>
            <Title level={3}>CustomHook (Hovering)</Title>
            <div {...attributes}>
                <Paragraph>
                    <Text>Hover Me!</Text>
                </Paragraph>
            </div>
            <Paragraph>
                <Text>State: {hovering ? "Hovering" : "Not Hovering"}</Text>
            </Paragraph>
        </React.Fragment>
    )
}