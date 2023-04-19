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
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Geocode from 'react-geocode';
import VerifyButton from '@passbase/button/react';
import AuthenticationContext from '../../contexts/authentication';
import { printErrors } from '../../utils/misc/printErrors';
import { googleMapsApiKey } from '../../assets/config/google-maps-api';
import { checkInvitationCode, checkPassbaseId } from '../../utils/api/authenticationApi';
import { FullLoader } from '../../components/FullLoader';

const { Option } = Select;
const { Title } = Typography;
const PassbaseStatus = {
  PROCESSING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

Geocode.setApiKey(googleMapsApiKey);

function RegisterHelperComponent() {
  const authenticationContext = useContext(AuthenticationContext);

  const [form] = Form.useForm();
  const history = useHistory();
  const [invitationCode, setInvitationCode] = useState('');
  const [passbaseError, setPassbaseError] = useState(null);
  const [invitationCodeError, setInvitationCodeError] = useState(null);
  const [step, setStep] = useState(0);
  const [initialStep, setInitialStep] = useState();
  const [firstStep, setFirstStep] = useState();
  const [loading, setLoading] = useState(false);

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const handleInvCodeSubmit = async () => {
    try {
      const invCodeResult = await checkInvitationCode(invitationCode);

      if (invCodeResult?.data) {
        setInitialStep({invitationCode});
        setInvitationCodeError(null);

        setStep(1);
      } else {
        setInvitationCodeError('Einladungscode ist nicht gültig oder abgelaufen');
      }
    } catch (e) {
      setInvitationCodeError('Fehler bei der Verifikation');
    }
  };

  const handleCheckPassbaseId = async (identityAccessKey) => {
    try {
      const checkResult = await checkPassbaseId(identityAccessKey);

      switch (checkResult.data) {
        case PassbaseStatus.PROCESSING:
          setTimeout(() => {
            handleCheckPassbaseId(identityAccessKey);
          }, 2000);
          break;
        case PassbaseStatus.SUCCESS:
          setLoading(false);
          await handleInitialStep(identityAccessKey);
          break;
        default:
          setLoading(false);
          setPassbaseError(true);
      }
    } catch (e) {
      setLoading(false);
      setPassbaseError(true);
    }
  };

  const handleInitialStep = async (identityAccessKey) => {
    setInitialStep({passbaseId: identityAccessKey});
    setInvitationCodeError(null);

    setStep(1);
  };

  const handleFirstStep = async (values) => {
    setFirstStep(values);

    setStep(2);
  };

  const onPassbaseFinish = (identityAccessKey) => {
    setLoading(true);

    handleCheckPassbaseId(identityAccessKey)
  };

  const handleForm = async (values) => {
    if (values.city && values.street) {
      const address = `${values.country} ${values.city} ${values.street} ${values.streetNo}`;

      const addressResponse = await Geocode.fromAddress(address);
      if (addressResponse.results?.length) {
        const location = {
          latitude: addressResponse.results[0].geometry.location.lat,
          longitude: addressResponse.results[0].geometry.location.lng,
        };

        const registerResult = await authenticationContext.performRegister({
          ...values,
          ...firstStep,
          ...initialStep,
          location,
        });

        if (registerResult) {
          history.push('/');
        }
      } else {
        const registerResult = await authenticationContext.performRegister({
          ...firstStep,
          ...initialStep
        });

        if (registerResult) {
          history.push('/');
        }
      }
    } else {
      const registerResult = await authenticationContext.performRegister({
        ...firstStep,
        ...initialStep
      });

      if (registerResult) {
        history.push('/');
      }
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
                {
                  passbaseError && (
                    <Alert
                      message="Es ist ein Fehler während der Verifizierung aufgetreten bitte wende dich an hallo@machbarschaft.jetzt"
                      type="error"
                    />
                  )
                }
                {
                  invitationCodeError && (
                    <Alert
                      message={invitationCodeError}
                      type="error"
                    />
                  )
                }
                {authenticationContext.authenticationState.registerErrors && (
                  <Alert
                    message="Es ist ein Fehler aufgetreten"
                    description={printErrors(
                      authenticationContext.authenticationState.registerErrors
                    )}
                    type="error"
                  />
                )}
                {step === 0 && (
                  <div className="verifying-container">
                    <Input.Group compact>
                      <Input value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} style={{ width: 'calc(100% - 200px)'}} placeholder="Einladungscode" />
                      <Button onClick={handleInvCodeSubmit} type="primary">Send</Button>
                    </Input.Group>
                  </div>
                )}
                {step === 1 && (
                  <Form
                    {...layout}
                    form={form}
                    name="register-helper"
                    style={{ width: '100%' }}
                    onFinish={handleFirstStep}
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
                      <Button type="primary" htmlType="submit">
                        Nächste
                      </Button>
                    </Form.Item>
                  </Form>
                )}

                {step === 2 && (
                  <Form
                    {...layout}
                    form={form}
                    name="register-helper"
                    style={{ width: '100%' }}
                    onFinish={handleForm}
                    hideRequiredMark
                    initialValues={{
                      countryCode: '49',
                      country: 'Deutschland',
                    }}
                  >
                    <Form.Item name="street" label="Strasse">
                      <Input />
                    </Form.Item>

                    <Form.Item name="streetNo" label="Hausnummer">
                      <Input />
                    </Form.Item>

                    <Form.Item name="zipCode" label="Postleitzahl">
                      <Input />
                    </Form.Item>

                    <Form.Item name="city" label="Stadt">
                      <Input />
                    </Form.Item>

                    <Form.Item name="country" label="Land">
                      <Input disabled />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="button"
                        onClick={() => setStep(1)}
                      >
                        Zurück
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={
                          authenticationContext.authenticationState
                            .isRegistering
                        }
                      >
                        Registrieren
                      </Button>
                    </Form.Item>
                  </Form>
                )}
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
        {
          loading && <FullLoader text="Bitte warten Sie. Dieser Prozess kann mehrere Minuten dauern." />
        }
      </div>
    </>
  );
}

export default RegisterHelperComponent;
