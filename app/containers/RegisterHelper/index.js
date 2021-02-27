import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Timeline,
  Typography,
} from 'antd';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthenticationContext from '../../contexts/authentication';
import { printErrors } from '../../utils/misc/printErrors';

const { Option } = Select;
const { Title } = Typography;

function RegisterHelperComponent() {
  const authenticationContext = useContext(AuthenticationContext);

  const [form] = Form.useForm();
  const history = useHistory();

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const handleForm = async (values) => {
    const registerResult = await authenticationContext.performRegister(
      values.email,
      values.phone,
      values.countryCode,
      values.password,
      values.forename,
      values.surname
    );

    if (registerResult === true) {
      history.push('/');
    }
  };

  const phonePrefixSelector = (
    <Form.Item name="countryCode" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="49">+49</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <div className="content-container-default">
        <div style={{ textAlign: 'center' }}>
          <Title level={1}>
            Mach mit uns deine Nachbarschaft zur Machbarschaft.
          </Title>
          <Title level={3}>
            Cool, dass <b>Du</b> dabei bist!
          </Title>
        </div>
        <div className="login-container">
          <Row type="flex" style={{ alignItems: 'center' }}>
            <Col xs={{ span: 24 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
              <Card
                title="Registrieren"
                headStyle={{ textAlign: 'center', fontSize: '150%' }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
                className="login-card"
              >
                {authenticationContext.authenticationState.registerErrors && (
                  <Alert
                    message="Es ist ein Fehler aufgetreten"
                    description={printErrors(
                      authenticationContext.authenticationState.registerErrors
                    )}
                    type="error"
                  />
                )}
                <Form
                  {...layout}
                  form={form}
                  name="register-helper"
                  style={{ width: '100%' }}
                  onFinish={handleForm}
                  hideRequiredMark
                  initialValues={{
                    countryCode: '49',
                  }}
                >
                  <Form.Item
                    name="forename"
                    label="Vorname"
                    rules={[
                      {
                        required: true,
                        message: 'Gib deinen Vornamen ein',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="surname"
                    label="Nachname"
                    rules={[
                      {
                        required: true,
                        message: 'Gib deinen Nachname ein',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Deine E-Mail Adresse"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Gib eine gültige E-Mail Adresse ein.',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Deine Telefonnummer"
                    rules={[
                      {
                        required: true,
                        pattern:
                          '(\\(?([\\d \\-\\)\\–\\+\\/\\(]+){6,}\\)?([ .\\-–\\/]?)([\\d]+))',
                        message: 'Gib eine gültige Telefonnummer ein.',
                      },
                    ]}
                  >
                    <Input
                      addonBefore={phonePrefixSelector}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Dein Passwort"
                    rules={[
                      {
                        required: true,
                        message: 'Gib ein Passwort ein.',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={
                        authenticationContext.authenticationState.isRegistering
                      }
                    >
                      Registrieren
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
              <Card
                className="login-card"
                title="So funktioniert's"
                headStyle={{ textAlign: 'center', fontSize: '150%' }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Timeline>
                  <Timeline.Item>
                    Super, dass du in deiner Nachbarschaft helfen möchtest!
                  </Timeline.Item>
                  <Timeline.Item>
                    Um loszulegen, brauchen wir nur einige Informationen über
                    dich. Bitte gib diese für deinen Nutzeraccount hier ein.
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default RegisterHelperComponent;
