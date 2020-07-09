import React from 'react';
import {
  Space, Button, Input, Typography, Form, Select,
} from 'antd';
import PropTypes from 'prop-types';
import resetPasswordSubmissionStateReducer from './resetPasswordSubmissionStateReducer';

const { Text } = Typography;
const { Option } = Select;

function ResetPasswordNewPwdLeftCard({ user, token, proceed }) {
  const [form] = Form.useForm();
  const [submissionState, dispatchSubmissionState] = React.useReducer(
    resetPasswordSubmissionStateReducer,
    {
      error: null,
      loading: false,
    },
  );

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const handleForm = async (values) => {
    dispatchSubmissionState({ type: 'submit' });
    console.log(`ToDo: send password set request for user '${user}', token '${token}', password '${data.password}' to backend`);
    setTimeout(() => {
      dispatchSubmissionState({ type: 'success' });
      proceed();
    }, 1000);
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="reset-password"
        style={{ width: '100%' }}
        onFinish={handleForm}
        hideRequiredMark
      >
        <Form.Item
          name="password"
          label="Passwort"
          rules={[
            {
              required: true,
              message: 'Gib dein Passwort ein.',
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Passwort wiederholen"
          rules={[
            {
              required: true,
              message: 'Gib dein Passwort erneut ein.',
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submissionState.loading}>Login</Button>
        </Form.Item>
      </Form>
    </>
  );
}

ResetPasswordNewPwdLeftCard.propTypes = {
  user: PropTypes.string.isRequired,
  setToken: PropTypes.string.isRequired,
  proceed: PropTypes.func.isRequired,
};

export default ResetPasswordNewPwdLeftCard;
