import React from 'react';
import { Typography } from 'antd';
import useHover from '../../hooks/examples/useHover';

const { Paragraph, Title, Text } = Typography;

export default function CustomHookExample() {
  const [hovering, attributes] = useHover();

  return (
    <>
      <Title level={3}>CustomHook (Hovering)</Title>
      <div {...attributes}>
        <Paragraph>
          <Text>Hover Me!</Text>
        </Paragraph>
      </div>
      <Paragraph>
        <Text>
          State:
          {hovering ? 'Hovering' : 'Not Hovering'}
        </Text>
      </Paragraph>
    </>
  );
}
