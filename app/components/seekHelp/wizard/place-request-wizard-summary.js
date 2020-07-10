import React from 'react';
import { Form, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import PlaceRequestWizardNavigation from './place-request-wizard-navigation';
import PlaceRequestWizardValidationError from './place-request-wizard-validation-error';

const { Title } = Typography;

/**
 * Default component of seek help wizard.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardSummary({
  handlePreviousPage,
  handleNextPage,
  wizardState,
}) {
  const [form] = Form.useForm();

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={1}>Stimmt alles?</Title>
      <Title level={4}>
        Bitte kontrollieren Sie alle Angaben. Anschließend werden wir unser
        Netzwerk aus freiwilligen Helferinnen und Helfern benachrichtigen.
      </Title>

      <Form
        {...formLayout}
        form={form}
        name="place-request-wizard-summary"
        hideRequiredMark
        onFinish={handleNextPage}
      >
        {/* ToDo: Summary UI */}

        {wizardState.hasError && (
          <PlaceRequestWizardValidationError wizardState={wizardState} />
        )}

        <PlaceRequestWizardNavigation
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
        />
      </Form>
    </Space>
  );
}

PlaceRequestWizardSummary.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
};
