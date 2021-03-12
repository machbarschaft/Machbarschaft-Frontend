import React from 'react';
import { Button, Form, Input } from 'antd';
import { updateUserRole } from '../../utils/api/userApi';
import { useHistory } from 'react-router-dom';

export default function EditRole() {
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      await updateUserRole(values.email);
      history.push('dashboard');
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div className="edit-role">
      <h2>Administrator hinzufügen</h2>
      <Form
        className="edit-role-form"
        name="basic"
        onFinish={onSubmit}
      >
        <Form.Item
          name={['email']}
          label="E-Mail Adresse"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Administrator hinzufügen
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
