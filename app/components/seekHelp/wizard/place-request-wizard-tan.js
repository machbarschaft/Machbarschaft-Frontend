import React from 'react';
import { Button, Form, Input, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import PlaceRequestWizardNavigation from './place-request-wizard-navigation';
import PlaceRequestWizardValidationError from './place-request-wizard-validation-error';
import { postRequestTan, putConfirmTan } from '../../../utils/api/phoneApi';

const { Title, Paragraph, Text } = Typography;

/**
 * Optional component of seek help wizard. Used, if user is not authenticated and no cookie is present.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardTan({
  handlePreviousPage,
  handleNextPage,
  wizardState,
  formData,
  phoneNumber,
}) {
  const [form] = Form.useForm();
  const formName = 'place-request-wizard-tan';

  const [requestTanState, setRequestTanState] = React.useState(false);

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  const handleRequestTan = async () => {
    setRequestTanState(true);
    await postRequestTan({
      phone: phoneNumber,
    });
    setRequestTanState(false);
  };

  React.useEffect(() => {
    handleRequestTan();
  }, []);

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={1}>Bestätigen Sie Ihre Identität</Title>

        <Title level={4}>
          Sie erhalten jeden Moment einen Anruf von uns. Es wird ihnen eine
          Zahlenkombination mitgeteilt.
        </Title>

        <Button
          type={'primary'}
          onClick={handleRequestTan}
          loading={requestTanState}
        >
          Neuer Anruf
        </Button>

        <Form
          {...formLayout}
          form={form}
          name={formName}
          hideRequiredMark
          onFinish={(formValues) => handleNextPage(formName, formValues)}
          initialValues={
            typeof formData.current[formName] !== 'undefined'
              ? {
                  code: formData.current[formName].code,
                }
              : {}
          }
        >
          <Form.Item
            label="Zahlenkombination"
            name="code"
            rules={[
              {
                required: true,
                message: 'Bitte geben Sie die Zahlenkombination an.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {wizardState.hasError && (
            <PlaceRequestWizardValidationError wizardState={wizardState} />
          )}

          <PlaceRequestWizardNavigation
            handlePreviousPage={handlePreviousPage}
            wizardState={wizardState}
          />
        </Form>
      </Space>
    </>
  );
}

PlaceRequestWizardTan.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
