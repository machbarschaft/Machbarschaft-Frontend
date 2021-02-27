import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Radio, Button, Typography } from 'antd';
import { postFeedback } from '../../utils/api/feedbackApi';
import { putReopenRequest } from '../../utils/api/requestStatusApi';
import sendStateReducer from '../../contexts/dashboard/sendStateReducer';
import {
  ERROR_FEEDBACK,
  ERROR_REOPEN_REQUEST,
  LOADING_FEEDBACK,
  LOADING_REOPEN_REQUEST,
  SUCCESS_FEEDBACK,
  SUCCESS_REOPEN_REQUEST,
} from '../../contexts/dashboard/types';

const { Title, Text } = Typography;
const { TextArea } = Input;

function DashboardFeedBackHelpSeeker({
  requestId,
  name,
  status,
  feedBackSent,
}) {
  const [form] = Form.useForm();
  const [sendState, dispatchSendState] = React.useReducer(sendStateReducer, {
    loading: false,
    loadingFeedback: false,
    loadingReopenRequest: false,
    sendingFinished: false,
    error: null,
  });
  const [formState, setFormState] = React.useState('initial');

  const sendFeedback = (formValues, reopenRequest) => {
    dispatchSendState({ type: LOADING_FEEDBACK });
    postFeedback(requestId, true, formValues.needContact, formValues.comment)
      .then((res) => {
        if (reopenRequest) {
          console.log('feedback successful, now send reopen');
          sendReopenRequest(formValues);
        }
        dispatchSendState({ type: SUCCESS_FEEDBACK });
      })
      .catch((err) => {
        dispatchSendState({ type: ERROR_FEEDBACK, error: err });
      });
  };
  const sendReopenRequest = (formValues) => {
    dispatchSendState({ type: LOADING_REOPEN_REQUEST });
    putReopenRequest(requestId)
      .then((res) => dispatchSendState({ type: SUCCESS_REOPEN_REQUEST }))
      .catch((err) =>
        dispatchSendState({ type: ERROR_REOPEN_REQUEST, error: err })
      );
  };
  React.useEffect(() => {
    if (sendState.sendingFinished) feedBackSent();
  }, [sendState.sendingFinished]);
  const statusMapping = {
    done: 'hat Ihren Auftrag als erfolgreich markiert',
    aborted: 'hat Ihren Auftrag abgebrochen',
    'did-not-help': 'hat angegeben, dass er Ihnen nicht helfen konnte',
  };

  return (
    <div className="dashboard-tile">
      <div className="horizontal-center">
        <Title level={3}>
          {name}{' '}
          {status in statusMapping
            ? statusMapping[status]
            : 'hat Ihren Auftrag beendet'}
          .
          <br />
          Lief alles erfolgreich?
        </Title>
      </div>
      <div className="dashboard-spacing" />
      <div className="horizontal-center">
        <Form
          form={form}
          hideRequiredMark
          onFinish={(formValues) => sendFeedback(formValues, false)}
        >
          <Form.Item
            name="needContact"
            rules={[
              {
                required: true,
                message:
                  'Bitte geben Sie an, ob Ihnen erfolgreich geholfen wurde.',
              },
            ]}
          >
            <Radio.Group
              size="large"
              onChange={(e) => setFormState(e.target.value ? 'no' : 'yes')}
            >
              <Radio.Button value={false}>JA</Radio.Button>
              <Radio.Button value className="spacing-left">
                NEIN
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {(formState === 'yes' || formState === 'no') && (
            <Form.Item name="comment">
              <TextArea
                placeholder={
                  'Was können wir besser machen?\nWie können wir Ihnen helfen?'
                }
                autoSize={{ minRows: 3, maxRows: 5 }}
                className="feedback-textarea"
              />
            </Form.Item>
          )}
          {sendState.error != null && (
            <Text type="danger">
              Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut!
            </Text>
          )}
          {formState === 'yes' && (
            <Form.Item>
              <div className="dashboard-spacing" />
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={sendState.loadingFeedback}
              >
                Feedback Absenden
              </Button>
            </Form.Item>
          )}
          {formState === 'no' && (
            <Form.Item>
              <div className="dashboard-spacing" />
              <Button
                type="primary"
                size="large"
                loading={sendState.loadingReopenRequest}
                onClick={() =>
                  sendFeedback(
                    form.getFieldsValue(['comment', 'needContact']),
                    true
                  )
                }
              >
                AUFTRAG ERNEUT FREIGEBEN
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="spacing-left"
                loading={sendState.loadingFeedback}
              >
                FEEDBACK ABSENDEN
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
}
DashboardFeedBackHelpSeeker.propTypes = {
  requestId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  feedBackSent: PropTypes.func.isRequired,
};
export default DashboardFeedBackHelpSeeker;
