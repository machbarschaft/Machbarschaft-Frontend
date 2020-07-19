import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import AuthenticationContext from '../../contexts/authentication';

const { Text } = Typography;
const { Option } = Select;

export default function WelcomeSection() {
  const authenticationContext = React.useContext(AuthenticationContext);
  const [form] = Form.useForm();

  const history = useHistory();

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const phonePrefixSelector = (
    <Form.Item name="countryCode" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="49">+49</Option>
      </Select>
    </Form.Item>
  );

  const handleStartHelpRequest = async (formValues) => {
    const parsedPhoneNumber =
      typeof formValues.phoneNumber !== 'undefined'
        ? formValues.phoneNumber.replace(/\D/g, '')
        : 0;

    const redirectURL =
      typeof formValues.phoneNumber !== 'undefined' && typeof formValues.countryCode !== 'undefined'
        ? `/place-request?phoneNumber=${parsedPhoneNumber}&countryCode=${formValues.countryCode}`
        : '/place-request';

    history.push(redirectURL);
  };

  return (
    <div className="landing-page-container content-container-default">
      <Row type="flex" style={{ alignItems: 'center' }}>
        <Col xs={{ span: 24 }} xxl={{ span: 12 }}>
          <div>
            <h1>MACHBARSCHAFT</h1>
            MACHBARSCHAFT ist eine Nachbarschaftshilfe für Menschen ohne
            Internetzugang oder Internetkompetenz.
            <br />
            <br />
            Mehr als 10 Mio. Menschen in Deutschland sind über 60, vom Virus
            besonders gefährdet und hilfsbedürftig - aber ohne Internet.
            <br />
            <br />
            Wir entwickeln eine Lösung, die für alle erreichbar ist: Einen
            technologie-gestützten Telefonservice, bei dem ältere Nachbar:innen
            ihre Anfragen für Einkäufe abgeben können. Zusammen mit einer App,
            in der freiwillige Helfer:innen Anfragen in der Nähe annehmen
            können.
            <br />
            <br />
            Mit unserer technologischen Plattform und künstlicher Intelligenz
            können wir schnell, sicher und skalierbar Hilfe zur Hilfe leisten.
          </div>
        </Col>
        <Col xs={{ span: 24 }} xxl={{ span: 12 }}>
          <Form
            form={form}
            name="landing-page-phone"
            hideRequiredMark
            initialValues={{
              countryCode: '49',
            }}
            onFinish={handleStartHelpRequest}
          >
            {!authenticationContext.isAuthenticated() && (
              <Form.Item
                label="Ihre Telefonnummer"
                name="phoneNumber"
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
                  suffix={<PhoneOutlined />}
                  size="large"
                />
              </Form.Item>
            )}

            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" size="large" htmlType="submit">
                Los!
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
