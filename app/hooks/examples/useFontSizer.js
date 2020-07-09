import React from 'react';
import { Typography, Button } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function useFontSizer() {
  const [fontSize, setFontSize] = React.useState(1);

  const increaseFontSize = () => setFontSize((fontSize) => fontSize + 0.2);

  const decreaseFontSize = () => setFontSize((fontSize) => fontSize - 0.2);

  return [fontSize, { increaseFontSize, decreaseFontSize }];
}

/**
 * Usage Example. Has to be embedded at top level.
 */
function FontSizerExample() {
  const [fontSize, attrs] = useFontSizer();

  return (
    <>
      <div
        style={{
          'font-size': `${fontSize}em`,
        }}
      >
        <Title>Hello World!</Title>
        <Title level={2}>Hello World!</Title>
        <Title level={3}>Hello World!</Title>
        <Title level={4}>Hello World!</Title>
        <Text>Hello World!</Text>
        <Paragraph>Hello World!</Paragraph>
        <p>Test</p>
      </div>
      <Button onClick={attrs.increaseFontSize}>+</Button>
      <Button onClick={attrs.decreaseFontSize}>-</Button>
    </>
  );
}
