import React from 'react';
import { Form, Space, Typography, Descriptions, Divider } from 'antd';
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
  formData,
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

      <Descriptions title="Deine Angaben" bordered>
        <Descriptions.Item label="Vorname">
          {formData.current['place-request-wizard-name'].forename}
        </Descriptions.Item>
        <Descriptions.Item label="Nachname" span={2}>
          {formData.current['place-request-wizard-name'].surname}
        </Descriptions.Item>

        <Descriptions.Item label="Straße">
          {formData.current['place-request-wizard-address'].street}
        </Descriptions.Item>
        <Descriptions.Item label="Hausnummer">
          {formData.current['place-request-wizard-address'].houseNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Postleitzahl">
          {formData.current['place-request-wizard-address'].zipCode}
        </Descriptions.Item>
        <Descriptions.Item label="Stadt" span={3}>
          {formData.current['place-request-wizard-address'].city}
        </Descriptions.Item>

        <Descriptions.Item label="Art">
          {formData.current['place-request-wizard-category'].requestType}
        </Descriptions.Item>
        <Descriptions.Item label="Auto benötigt">
          {formData.current['place-request-wizard-category'].carNecessary}
        </Descriptions.Item>
        <Descriptions.Item label="Rezept benötigt">
          {
            formData.current['place-request-wizard-category']
              .prescriptionRequired
          }
        </Descriptions.Item>
        <Descriptions.Item label="Dringlichkeit">
          {formData.current['place-request-wizard-urgency'].urgency}
        </Descriptions.Item>
      </Descriptions>

      <Form
        {...formLayout}
        form={form}
        name="place-request-wizard-summary"
        hideRequiredMark
        onFinish={handleNextPage}
      >
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
  formData: PropTypes.object.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
