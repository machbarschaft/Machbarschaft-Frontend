import React from 'react';
import { Typography, Button } from 'antd';

import useFontSizer from '../../hooks/examples/useFontSizer';

const { Title, Text } = Typography;

/**
 * Usage Example. Has to be embedded at top level.
 */
export default function UseFontSizer() {
  const [fontSize, attrs] = useFontSizer();

  return (
    <>
      {/* Trick from https://stackoverflow.com/a/45669262 */}
      <div ref={(node) => {
        if (node) {
          node.style.setProperty('font-size', `${fontSize}em`, 'important');
        }
      }}
      >
        <Title>Hello World!</Title>
        <p>Test</p>
      </div>
      <Button onClick={attrs.increaseFontSize}>+</Button>
      <Button onClick={attrs.decreaseFontSize}>-</Button>
    </>
  );
}
