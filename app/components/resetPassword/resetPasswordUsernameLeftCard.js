import React from 'react';
import { Button, Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { MailOutlined } from '@ant-design/icons';

import resetPasswordSubmissionStateReducer from '../../contexts/resetPassword/resetPasswordSubmissionStateReducer';
import { SUBMIT, SUCCESS } from '../../contexts/resetPassword/types';

function ResetPasswordUsernameLeftCard({ setUser, proceed }) {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const [submissionState, dispatchSubmissionState] = React.useReducer(
    resetPasswordSubmissionStateReducer,
    {
      error: null,
      loading: false,
    }
  );

  const handleForm = async (values) => {
    dispatchSubmissionState({ type: SUBMIT });
    setUser(data.user);
    console.log(`ToDo: send reset request for user '${data.user}' to backend`);
    setTimeout(() => {
      dispatchSubmissionState({ type: SUCCESS });
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
          name="user"
          label="E-Mail Adresse"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Geben Sie eine gültige E-Mail Adresse ein.',
            },
          ]}
        >
          <Input size="large" suffix={<MailOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={submissionState.loading}
          >
            Senden
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

ResetPasswordUsernameLeftCard.propTypes = {
  setUser: PropTypes.func.isRequired,
  proceed: PropTypes.func.isRequired,
};

export default ResetPasswordUsernameLeftCard;
