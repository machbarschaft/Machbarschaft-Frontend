import React from 'react';
import { Typography, Button, Space, Result, Spin } from 'antd';

const { Title, Paragraph, Text } = Typography;

/* A reducer function is used to deal with complex state transitions. It accepts a state and an action.
 * It returns the new state (that may e.g. depend on the action). */
function reducerFunction(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      error: null,
      data: 'Some Data',
    };
  }
  if (action.type === 'error') {
    return {
      ...state,
      error: 'Some Error',
      data: null,
    };
  }
  throw new Error('Unsupported');
}

export default function UseReducerExample() {
  /* React.useReducer accepts the reducer function (called via dispatch) as the first parameter. The second parameter is an initial state.
   * You get a state object (that you can use like any state object) and a dispatch handler to call the reducer. */
  const [state, dispatch] = React.useReducer(reducerFunction, {
    error: null,
    data: null,
  });

  const isLoading = state.error === null && state.data === null;

  return (
    <>
      <Title level={3}>React.useReducer</Title>
      <Paragraph>
        {isLoading && <Result icon={<Spin size="large" />} />}
        {state.error !== null && (
          <Text>
            Error:
            {state.error}
          </Text>
        )}
        {state.data !== null && (
          <Text>
            Success:
            {state.data}
          </Text>
        )}
      </Paragraph>
      <Space>
        {/* In case of a success, the reducer is called with 'success'. The reducer can now decide how that influences the state. You can pass as many parameters as you'd like. */}
        <Button
          type="primary"
          onClick={() =>
            dispatch({
              type: 'success',
            })
          }
        >
          Success
        </Button>
        <Button
          type="danger"
          onClick={() =>
            dispatch({
              type: 'error',
            })
          }
        >
          Error
        </Button>
      </Space>
    </>
  );
}
