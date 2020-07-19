import React from 'react';
import {
  Result,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Radio,
  notification,
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
  const validatePhoneNumber = React.useRef({
    phoneNumber: '',
    countryCode: '',
  });
  const handleRequestTan = () => {
    postRequestTan({
      phone: validatePhoneNumber.current.phoneNumber,
      countryCode: validatePhoneNumber.current.countryCode,
      sms: requestType === 'sms',
    })
      .then(() =>
        notification.success({
          message: 'Fertig',
          description: 'Erfolgreich angefordert!',
        })
      )
      .catch((err) =>
        notification.error({
          message: 'Fehler',
          description:
            'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut!',
        })
      );
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
      phone: validatePhoneNumber.current.phoneNumber,
      countryCode: validatePhoneNumber.current.countryCode,
      tan: values.code,
    })
      .then((result) => {
        dispatch({
          type: 'validateSuccess',
        });
        authenticationContext.checkAuthentication();
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
    <Form.Item name="countryCode" noStyle>
      <Select style={{ width: 70 }} disabled>
        <Option value="49">+49</Option>
      </Select>
    </Form.Item>
  );

  React.useState(() => {
    if (authenticationContext.isAuthenticated()) {
      validatePhoneNumber.current.phoneNumber =
        authenticationContext.authenticationState.phoneNumber;
      validatePhoneNumber.current.countryCode =
        authenticationContext.authenticationState.countryCode;
    } else {
      const { phoneNumber, countryCode } = queryString.parse(
        props.location.search
      );
      if (typeof phoneNumber !== 'undefined') {
        validatePhoneNumber.current.phoneNumber = phoneNumber;
      } else {
        // ToDo: Error
      }
      if (typeof countryCode !== 'undefined') {
        validatePhoneNumber.current.countryCode = countryCode;
      } else {
        // ToDo: Error
      }
    }
    if(authenticationContext.authenticationState.isPhoneVerified) {
      postRequestTan({
      phone: validatePhoneNumber.current.phoneNumber,
      countryCode: validatePhoneNumber.current.countryCode,
      sms: false,
    })
      .then(() =>
        notification.success({
          message: 'Sie werden in Kürze einen Anruf erhalten!',
        })
      )
      .catch((err) =>
        notification.error({
          message: 'Fehler',
          description:
            'Es ist ein Fehler aufgetreten. Bitte versuchen Sie erneut, die TAN anzufordern!',
        })
      );
    }
  }, []);
  const [requestType, setRequestType] = React.useState('call');

  return (
    <>
      <div className="content-container-default">
        <div className="login-container">
          {(validatePhoneState.validateSuccess ||
            authenticationContext.authenticationState.phoneVerified) && (
            <Result
              status="success"
              title="Deine Telefonnummer wurde erfolgreich validiert."
              subTitle="Du kannst nun zurück zur Startseite gehen und deinen Account verwenden."
            />
          )}
          {!authenticationContext.authenticationState.phoneVerified &&
            !validatePhoneState.validateSuccess && (
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
                        countryCode: validatePhoneNumber.current.countryCode,
                        phone: validatePhoneNumber.current.phoneNumber,
                      }}
                    >
                      <Form.Item
                        name="phone"
                        label="Ihre Handynummer"
                        rules={[
                          {
                            required: true,
                            message:
                              'Geben Sie eine gültige Telefonnummer ein.',
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
                        <Result
                          status="warning"
                          title="Deine Telefonnummer konnte nicht bestätigt werden. Bitte überprüfe deinen Code."
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
                      Bitte verifizieren Sie Ihre Telefonnummer. Dies dient als
                      Schutz, damit nur Sie Ihre Telefonnummer als
                      Identifikation nutzen können.
                      <br />
                      Dieser Sicherheitsschritt bedeutet auch, dass alle
                      Personen mit denen Sie über unsere Website in Kontakt
                      kommen eindeutig identifiziert werden können, falls sie
                      sich missbräuchlich verhalten.
                      <br />
                      <br />
                      <Radio.Group
                        size="large"
                        onChange={(e) => setRequestType(e.target.value)}
                      >
                        <Radio.Button value="call">Anruf</Radio.Button>
                        <Radio.Button value="sms" className="spacing-left">
                          SMS
                        </Radio.Button>
                      </Radio.Group>
                      <br />
                      <br />
                      <Button type="primary" onClick={() => handleRequestTan()}>
                        {requestType === 'call'
                          ? 'Jetzt erneut anrufen'
                          : 'TAN erneut senden'}
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
