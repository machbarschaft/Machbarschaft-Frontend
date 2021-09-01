import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { updateUserRole } from '../../utils/api/userApi';
import { useHistory } from 'react-router-dom';
import AuthenticationContext from '../../contexts/authentication';
import roles from '../../utils/constants/roles';

export default function EditRole() {
  const history = useHistory();
  const authProps = React.useContext(AuthenticationContext);

  const onSubmit = async (values) => {
    try {
      authProps.startLoading();
      await updateUserRole(values.email, roles.ADMIN);
      authProps.finishLoading();
      history.push('dashboard');
    } catch (e) {
      authProps.finishLoading();

      notification['error']({
        message: 'Error',
        description:
          'Für diese Email Adresse ist kein Account hinterlegt. Es muss zuerst ein Account registriert werden, bevor man es zum Admin ernennen kann.'
      });
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
