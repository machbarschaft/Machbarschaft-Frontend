import React from 'react';
import {
  Card,
  Input,
  Button,
  notification,
  Typography,
  Timeline,
  Form,
  Select,
} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { postContactRequest } from '../../utils/api/contactApi';

function ContactWindow() {
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const [form] = Form.useForm();

  const handleForm = async (values) => {
    setLoadingState(true);
    await postContactRequest({ email: values.email, text: values.text })
      .then((request) => {
        setMessageState(true);
        setLoadingState(false);
        notification.success({
          message: 'Anfrage abgesendet',
          description:
            'Vielen Dank! Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich zurück.',
        });
      })
      .catch((error) => {
        setLoadingState(false);
        notification.error({
          message: 'Fehler',
          description: error.message,
        });
      });
  };
  const [loadingState, setLoadingState] = React.useState(false);
  const [messageState, setMessageState] = React.useState(false);

  return (
    <div className="content-container-default">
      <div className="contact-container">
        <Card
          title="Kontakt"
          headStyle={{ textAlign: 'center', fontSize: '150%' }}
          bodyStyle={{ textAlign: 'center' }}
          bordered={false}
          className="contact-card"
        >
          <Form
            {...layout}
            form={form}
            name="contact"
            style={{ width: '100%' }}
            onFinish={handleForm}
            hideRequiredMark
          >
            <Form.Item
              name="email"
              label="E-Mail Adresse"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Geben Sie eine gültige E-Mail Adresse ein.',
                },
              ]}
            >
              <Input size="large" suffix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
              name="text"
              label="Nachricht"
              rules={[
                {
                  required: true,
                  message: 'Geben Sie eine Nachricht ein.',
                },
              ]}
            >
              <Input.TextArea style={{ height: '220px' }} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={messageState}
                loading={loadingState}
              >
                Anfrage absenden
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card className="contact-card contact-description-card">
          <Timeline>
            <Timeline.Item>
              Sie erreichen uns jederzeit über das Kontaktformular.
            </Timeline.Item>
            <Timeline.Item>
              Sie möchten eine neue Anfrage erstellen?
              <br />
              Rufen Sie uns an unter +49 40 299 960 888!
            </Timeline.Item>
            <Timeline.Item>
              Sie möchten mit Ihrem Nachbarn verbunden werden, dem Sie helfen?
              <br />
              Rufen Sie uns an unter +49 40 299 960 804!
            </Timeline.Item>
            <Timeline.Item>
              Sie können uns per Kontaktformular nicht erreichen?
              <br />
              Schreiben Sie uns eine E-Mail an{' '}
              <a href={'mailto:hallo@machbarschaft.jetzt'}>
                hallo@machbarschaft.jetzt
              </a>
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>
    </div>
  );
}

export default ContactWindow;
