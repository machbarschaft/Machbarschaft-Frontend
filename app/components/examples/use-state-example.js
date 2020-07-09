import React from 'react';
import { Typography, Button, Space } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function UseStateExample() {
  /* React.useState returns a state, and a setter for that state. You may give an initial value for a state. */
  const [state, setState] = React.useState(true);

  return (
    <>
      <Title level={3}>React.useState</Title>
      <Paragraph>
        <Text>
          Der aktuelle Wert von
          <Text code>state</Text>
          {' '}
          ist
          <Text code>{state ? 'TRUE' : 'FALSE'}</Text>
        </Text>
      </Paragraph>
      <Space>

        {/* If the new state depends on the previous state, you need to pass a function to set state having the old state as a parameter. */}
        <Button
          type="primary"
          onClick={() => setState((curState) => !curState)}
        >
          Toggle
        </Button>

        {/* If the new state does not depend on the previous state, you can just pass a new value. */}
        <Button
          type="primary"
          onClick={() => setState(false)}
        >
          Set to
          <Text code>FALSE</Text>
        </Button>
      </Space>

    </>
  );
}
