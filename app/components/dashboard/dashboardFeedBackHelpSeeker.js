import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Radio, Button, Typography } from 'antd';
import { postFeedback } from '../../utils/api/feedbackApi';
import { putReopenRequest } from '../../utils/api/requestStatusApi';

const { Title, Text } = Typography;
const { TextArea } = Input;

function sendStateReducer(state, action) {
  if (action.type === 'success-feedback') {
    return {
      ...state,
      loading: state.loadingReopenRequest,
      loadingFeedback: false,
      sendingFinished: !state.loadingReopenRequest,
    };
  }
  if (action.type === 'success-reopenrequest') {
    return {
      ...state,
      loading: state.loadingFeedback,
      loadingReopenRequest: false,
      sendingFinished: !state.loadingFeedback,
    };
  }
  if (action.type === 'error-feedback') {
    console.log('error: ', action.error);
    return {
      ...state,
      loading: state.loadingReopenRequest,
      loadingFeedback: false,
      error: action.error,
    };
  }
  if (action.type === 'error-reopenrequest') {
    console.log('error: ', action.error);
    return {
      ...state,
      loading: state.loadingFeedback,
      loadingReopenRequest: false,
      error: action.error,
    };
  }
  if (action.type === 'loading-feedback') {
    return {
      ...state,
      loading: true,
      loadingFeedback: true,
      error: null,
    };
  }
  if (action.type === 'loading-reopenrequest') {
    return {
      ...state,
      loading: true,
      loadingReopenRequest: true,
      error: null,
    };
  }
  throw new Error('Unsupported');
}

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
    dispatchSendState({ type: 'loading-feedback' });
    postFeedback(requestId, true, formValues.needContact, formValues.comment)
      .then((res) => {
        if (reopenRequest) {
          console.log('feedback successful, now send reopen');
          sendReopenRequest(formValues);
        }
        dispatchSendState({ type: 'success-feedback' });
      })
      .catch((err) => {
        dispatchSendState({ type: 'error-feedback', error: err });
      });
  };
  const sendReopenRequest = (formValues) => {
    dispatchSendState({ type: 'loading-reopenrequest' });
    putReopenRequest(requestId)
      .then((res) => dispatchSendState({ type: 'success-reopenrequest' }))
      .catch((err) =>
        dispatchSendState({ type: 'error-reopenrequest', error: err })
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
