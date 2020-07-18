import React from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
import AuthenticationContext from '../../contexts/authentication';
import { postRequestTan, putConfirmTan } from '../../utils/api/phoneApi';

const { Option } = Select;
const { Paragraph } = Typography;

const queryString = require('query-string');

function ValidatePhoneReducer(state, action) {
  switch (action.type) {
    case 'validateStart':
      return {
        ...state,
        validateFailure: false,
        validateSuccess: false,
      };
    case 'validateSuccess':
      return {
        ...state,
        validateFailure: false,
        validateSuccess: true,
      };
    case 'validateFailure':
      return {
        ...state,
        validateSuccess: false,
        validateFailure: true,
        validateErrorMsg: action.data.validateErrorMsg,
      };
    default:
      throw Error('Unsupported Type');
  }
}

export default function ValidatePhoneComponent(props) {
  const authenticationContext = React.useContext(AuthenticationContext);

  const [validatePhoneState, dispatch] = React.useReducer(
    ValidatePhoneReducer,
    {
      validateInProgress: false,

      validateSuccess: false,

      validateFailure: false,
      validateErrorMsg: '',
    }
  );
  const validatePhoneNumber = React.useRef('');
  const handleRequestTan = async () => {
    await postRequestTan({
      phone: validatePhoneNumber.current,
    });
  };

  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const handleForm = async (values) => {
    dispatch({
      type: 'validateStart',
    });
    putConfirmTan({
      phone: validatePhoneNumber.current,
      tan: values.code,
    })
      .then((result) => {
        dispatch({
          type: 'validateSuccess',
        });
      })
      .catch((error) => {
        dispatch({
          type: 'validateFailure',
          data: {
            validateErrorMsg: error.toString(),
          },
        });
      });
  };

  const phonePrefixSelector = (
    <Form.Item name="phonePrefix" noStyle>
      <Select style={{ width: 70 }} disabled>
        <Option value="49">+49</Option>
      </Select>
    </Form.Item>
  );

  React.useState(() => {
    if (authenticationContext.isAuthenticated()) {
      validatePhoneNumber.current =
        authenticationContext.authenticationState.phoneNumber;
      console.log(
        'is authenticated: ',
        authenticationContext.authenticationState
      );
    } else {
      const { phoneNumber } = queryString.parse(props.location.search);
      if (typeof phoneNumber !== 'undefined') {
        validatePhoneNumber.current = phoneNumber;
      } else {
        // ToDo: Error
      }
    }
  }, []);

  return (
    <>
      <div className="content-container-default">
        <div className="login-container">
          {validatePhoneState.validateSuccess && (
            <Alert
              message="Fertig"
              description="Ihre Telefonnummer wurde erfolgreich validiert. Sie können nun zurück zur Startseite gehen und Ihr Konto verwenden."
              type="success"
            />
          )}
          {!validatePhoneState.validateSuccess && (
            <Row type="flex" style={{ alignItems: 'center' }}>
              <Col xs={{ span: 24 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                <Card
                  title="Telefon bestätigen"
                  headStyle={{ textAlign: 'center', fontSize: '150%' }}
                  bodyStyle={{ textAlign: 'center' }}
                  bordered={false}
                  className="login-card"
                >
                  <Form
                    {...layout}
                    form={form}
                    name="validate-phone"
                    style={{ width: '100%' }}
                    onFinish={handleForm}
                    hideRequiredMark
                    initialValues={{
                      phonePrefix: '49',
                      phone: validatePhoneNumber.current,
                    }}
                  >
                    <Form.Item
                      name="phone"
                      label="Ihre Handynummer"
                      rules={[
                        {
                          required: true,
                          message: 'Geben Sie eine gültige Telefonnummer ein.',
                        },
                      ]}
                    >
                      <Input
                        addonBefore={phonePrefixSelector}
                        style={{ width: '100%' }}
                        size="large"
                        disabled
                      />
                    </Form.Item>

                    <Form.Item
                      name="code"
                      label="Code zur Bestätigung"
                      rules={[
                        {
                          required: true,
                          message:
                            'Geben Sie den Code ein, den Sie per SMS oder Anruf erhalten hast.',
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={validatePhoneState.validateInProgress}
                      >
                        Bestätigen
                      </Button>
                    </Form.Item>
                  </Form>

                  <Row>
                    {validatePhoneState.validateFailure && (
                      <Alert
                        message="Es ist ein Fehler aufgetreten"
                        description="Ihre Telefonnummer konnte nicht bestätigt werden. Bitte überprüfen Sie den Code."
                        type="error"
                      />
                    )}
                  </Row>
                </Card>
              </Col>
              <Col xs={{ span: 24 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                <Card
                  className="login-card"
                  title="Warum ist das wichtig?"
                  headStyle={{ textAlign: 'center', fontSize: '150%' }}
                  bodyStyle={{ textAlign: 'center' }}
                  bordered={false}
                >
                  <Paragraph>
                    Ein kurzer Text dazu, warum wir das machen.
                    <br />
                    <Button type="primary" onClick={() => handleRequestTan()}>
                      TAN erneut schicken
                    </Button>
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </>
  );
}
