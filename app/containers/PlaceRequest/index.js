import React from 'react';
import { Space, Form, Input, Button } from 'antd';
import {
  createHelpRequest,
} from '../../utils/api/placeRequestApi';
import placeRequestReducer from '../../contexts/placeRequest/placeRequestReducer';
import { ERROR, LOADED } from '../../contexts/placeRequest/types';
import { useHistory } from 'react-router-dom';

export default function PlaceRequestWindow(props) {
  const history = useHistory();

  const [wizardState, dispatch] = React.useReducer(placeRequestReducer, {
    currentStep: 0,
    formData: [],
    isValidating: false,
    isLoading: true,
    hasError: false,
    errorMsg: '',
  });

  const onFinish = async (values) => {
    const helpSeeker = {
      fullName: values.fullName,
      phone: values.phone,
      source: 'ADMIN'
    };

    await createHelpRequest(helpSeeker, values.requestText);

    dispatch({
      type: LOADED,
    });

    history.push('dashboard');
  };

  const onFinishFailed = (errorInfo) => {
    dispatch({
      type: ERROR,
      data: errorInfo,
    });
  };

  return (
    <Space
      direction="vertical"
      size="large"
      className="content-container-default"
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Vor- und Nachname"
          name="fullName"
          rules={[{ required: true, message: 'Bitte geben Sie einen Hilfesuchenden ein.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Telefonnummer"
          name="phone"
          rules={[{ required: true, message: 'Bitte geben Sie eine Telefonnummer ein.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hinweis"
          name="requestText"
          rules={[{ required: true, message: 'Bitte geben Sie einen Hinweis ein.' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Speichern
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}
