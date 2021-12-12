import React, { useState } from 'react';
import { Button, Input, Form, Alert } from 'antd';
import PropTypes from 'prop-types';
import { MailOutlined } from '@ant-design/icons';

import resetPasswordSubmissionStateReducer from '../../contexts/resetPassword/resetPasswordSubmissionStateReducer';
import { SUBMIT, SUCCESS, ERROR } from '../../contexts/resetPassword/types';
import { sendPasswordReset } from '../../utils/api/authenticationApi';

function ResetPasswordUsernameLeftCard({ setUser, proceed }) {
  const [form] = Form.useForm();
  const [err, setErr] = useState(null);

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
    try {
      await sendPasswordReset(values.user)
      setUser(values.user);
      setErr(null)
      dispatchSubmissionState({ type: SUCCESS });
      proceed();
    } catch (e) {
      dispatchSubmissionState({ type: ERROR });
      setErr(e);
    }
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
        {
          err && (
            <Alert
              message="Überprüfen Sie Ihre E-Mail-Adresse"
              type="error"
            />
          )
        }
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
