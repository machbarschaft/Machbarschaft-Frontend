import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Card,
  Input,
  Space,
  Button,
  Typography,
  Timeline,
  Form,
  Select,
} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import AuthenticationContext from '../../contexts/authentication';

const { Option } = Select;
const { Text } = Typography;

function LoginWindow({ location: { username } = '' }) {
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

  function onSubmit(data) {
    authenticationContext.performAuthentication(data.user, data.password);
  }

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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={
                  authenticationContext.authenticationState.isAuthenticating
                }
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card className="login-card login-description-card">
          <Timeline>
            <Timeline.Item>
              Bitte geben Sie Ihre Telefonnummer oder E-Mail-Adresse und Ihr
              Passwort ein.
            </Timeline.Item>
            <Timeline.Item>
              Passwort vergessen? Dann klicken sie bitte hier:
              <br />
              <Link to="/resetpassword">
                <Button className="login-description-card-button">
                  Passwort zurücksetzen
                </Button>
              </Link>
            </Timeline.Item>
            <Timeline.Item>
              Wenn Sie noch keinen Account erstellt haben:
              <br />
              <Button className="login-description-card-button" type="primary">
                Registrieren
              </Button>
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>
    </div>
  );
}

LoginWindow.propTypes = {
  location: PropTypes.shape({
    username: PropTypes.string,
  }),
};

export default LoginWindow;
