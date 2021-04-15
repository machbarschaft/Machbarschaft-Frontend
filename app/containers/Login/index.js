import { MailOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Timeline,
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthenticationContext from '../../contexts/authentication';
import { printErrors } from '../../utils/misc/printErrors';

function LoginWindow({ location: { username } = '', showRegister = true }) {
  const authenticationContext = React.useContext(AuthenticationContext);

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const [form] = Form.useForm();
  const history = useHistory();

  const handleForm = async (values) => {
    await authenticationContext.performAuthentication(
      values.user,
      values.password
    );
  };

  React.useEffect(() => {
    if (authenticationContext.authenticationState.uid != null) {
      history.push('/');
    }
  }, [authenticationContext.authenticationState]);

  return (
    <div className="content-container-default">
      <div className="login-container">
        <Card
          title="Login"
          headStyle={{ textAlign: 'center', fontSize: '150%' }}
          bodyStyle={{ textAlign: 'center' }}
          bordered={false}
          className="login-card"
        >
          <Form
            {...layout}
            form={form}
            name="login"
            style={{ width: '80%' }}
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
                  message: 'Gib eine gültige E-Mail Adresse ein.',
                },
              ]}
            >
              <Input size="large" suffix={<MailOutlined />} />
            </Form.Item>

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

            <Form.Item className="justify-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={
                  authenticationContext.authenticationState.isAuthenticating
                }
              >
                Login
              </Button>
              <Link className="left-margin" to="/passwort-zuruecksetzen">
                <Button className="login-description-card-button">
                  Passwort zurücksetzen
                </Button>
              </Link>
            </Form.Item>
            <Form.Item className="justify-center">
              <div className="bottom-margin">Oder</div>
              <Button
                className="login-description-card-button"
                type="primary"
                onClick={() => history.push('/registrieren')}
              >
                Registrieren
              </Button>
            </Form.Item>
          </Form>
          {authenticationContext.authenticationState.authenticationErrors && (
            <Alert
              message="Es ist ein Fehler aufgetreten"
              description={printErrors(
                authenticationContext.authenticationState.authenticationErrors
              )}
              type="error"
            />
          )}
        </Card>
      </div>
    </div>
  );
}

LoginWindow.propTypes = {
  location: PropTypes.shape({
    username: PropTypes.string,
  }),
  showRegister: PropTypes.bool,
};

export default LoginWindow;
