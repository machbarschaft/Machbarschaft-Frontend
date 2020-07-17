import React from 'react';
import PropTypes from 'prop-types';
import {Input, Form, Radio, Button, message, Typography} from 'antd';
import { putFeedback } from '../../utils/api/feedbackAPI';

const { Title } = Typography;
const { TextArea } = Input;

function DashboardFeedBackHelper({processId, name, feedBackSent}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const sendFeedback = (formValues) => {
    setLoading(true);
    putFeedback(processId, true, formValues.needContact, formValues.comment)
      .then((res) => {
        message.success('Feedback erfolgreich abgeschickt!');
        setLoading(false);
        feedBackSent();
      })
      .catch((err) => {
        message.error('Es ist ein Fehler aufgetreten, bitte versuche es erneut!');
        setLoading(false);
      })
  };

  return (
    <div className="dashboard-tile">
      <div className="horizontal-center">
        <Title level={3}>Konnten Sie {name} erfolgreich helfen?</Title>
      </div>
      <div className="dashboard-spacing"></div>
      <div className="horizontal-center">
        <Form
            form={form}
            hideRequiredMark
            onFinish={(formValues) => sendFeedback(formValues)}
          >
            <Form.Item
              name="needContact"
              rules={[
                {
                  required: true,
                  message: 'Bitte geben Sie an, ob Sie erfolgreich helfen konnten.',
                },
              ]}>
              <Radio.Group size="large">
                <Radio.Button value={false}>JA</Radio.Button>
                <Radio.Button value={true} className={"spacing-left"}>NEIN</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="comment"
            >
              <TextArea
                placeholder={"Was können wir besser machen?\nWie können wir Ihnen helfen?"}
                autoSize={{ minRows: 3, maxRows: 5 }}
                className={"feedback-textarea"}
              />
            </Form.Item>
            <Form.Item>
              <div className="dashboard-spacing"></div>
              <Button type="primary" size="large" htmlType="submit" loading={loading}>
                  ABSENDEN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  );
}
DashboardFeedBackHelper.propTypes = {
  processId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  feedBackSent: PropTypes.func.isRequired
}
export default DashboardFeedBackHelper;