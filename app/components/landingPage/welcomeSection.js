import React from 'react';
import {
  Button, Col, Form, Input, Row, Typography,
} from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import AuthenticationContext from '../../contexts/authentication';

const { Text } = Typography;

export default function WelcomeSection() {
  const authenticationContext = React.useContext(AuthenticationContext);
  const [form] = Form.useForm();

  const history = useHistory();

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleStartHelpRequest = async (formValues) => {
    const redirectURL = typeof formValues.phoneNumber !== 'undefined' ? `/place-request?phoneNumber=${formValues.phoneNumber}` : '/place-request';

    history.push({
      pathname: redirectURL,
    });
  };

  return (
    <div className="landing-page-container content-container-default">
      <Row type="flex" style={{ alignItems: 'center' }}>
        <Col xs={{ span: 24 }} xxl={{ span: 12 }}>
          <div>
            <h1>MACHBARSCHAFT</h1>
            MACHBARSCHAFT ist eine Nachbarschaftshilfe für Menschen ohne Internetzugang oder Internetkompetenz.
            <br />
            <br />
            Mehr als 10 Mio. Menschen in Deutschland sind über 60, vom Virus besonders gefährdet und hilfsbedürftig - aber ohne Internet.
            <br />
            <br />
            Wir entwickeln eine Lösung, die für alle erreichbar ist: Einen technologie-gestützten Telefonservice, bei dem ältere Nachbar:innen ihre Anfragen für Einkäufe abgeben können.
            Zusammen mit einer App, in der freiwillige Helfer:innen Anfragen in der Nähe annehmen können.
            <br />
            <br />
            Mit unserer technologischen Plattform und künstlicher Intelligenz können wir schnell, sicher und skalierbar Hilfe zur Hilfe leisten.
          </div>
        </Col>
        <Col xs={{ span: 24 }} xxl={{ span: 12 }}>
          <Form
            form={form}
            name="landing-page-phone"
            hideRequiredMark
            onFinish={handleStartHelpRequest}
          >
            {!authenticationContext.isAuthenticated()
                        && (
                        <Form.Item
                          label="Ihre Telefonnummer"
                          name="phoneNumber"
                          rules={[
                            {
                              required: true,
                              message: 'Bitte geben Sie Ihre Telefonnummer ein.',
                            },
                          ]}
                        >
                          <Input prefix={<PhoneOutlined />} size="large" />
                        </Form.Item>
                        )}

            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" size="large" htmlType="submit">Los!</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </div>
  );
}
