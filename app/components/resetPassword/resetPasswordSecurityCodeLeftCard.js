import React from 'react';
import { Button, Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { MailOutlined } from '@ant-design/icons';
import resetPasswordSubmissionStateReducer from '../../contexts/resetPassword/resetPasswordSubmissionStateReducer';
import { SUBMIT, SUCCESS } from '../../contexts/resetPassword/types';

function ResetPasswordSecurityCodeLeftCard({ user, setToken, proceed }) {
  const [submissionState, dispatchSubmissionState] = React.useReducer(
    resetPasswordSubmissionStateReducer,
    {
      error: null,
      loading: false,
    }
  );

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const [form] = Form.useForm();

  const handleForm = async (values) => {
    dispatchSubmissionState({ type: SUBMIT });
    console.log(
      `ToDo: send security code check request for user '${user}', code '${data.code}' to backend`
    );
    setToken('demo_token');
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
              type: 'code',
              message:
                'Geben Sie den Code ein, den Sie per E-Mail erhalten hast.',
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

ResetPasswordSecurityCodeLeftCard.propTypes = {
  user: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
  proceed: PropTypes.func.isRequired,
};

export default ResetPasswordSecurityCodeLeftCard;
