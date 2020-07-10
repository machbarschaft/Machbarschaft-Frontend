import React from 'react';
import { Row, Col, Typography, Input, Button, Radio, Space, Form } from 'antd';
import PropTypes from 'prop-types';
import PlaceRequestWizardNavigation from './place-request-wizard-navigation';
import PlaceRequestWizardValidationError from './place-request-wizard-validation-error';

const { Title } = Typography;

/**
 * Default component of seek help wizard.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardCategory({
  handlePreviousPage,
  handleNextPage,
  wizardState,
  formData,
}) {
  const [form] = Form.useForm();
  const formName = 'place-request-wizard-category';

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={1}>Welche Art von Hilfe benötigen Sie?</Title>

      <Form
        {...formLayout}
        form={form}
        name={formName}
        hideRequiredMark
        onFinish={(formValues) => handleNextPage(formName, formValues)}
        initialValues={
          typeof formData.current[formName] !== 'undefined'
            ? {
                requestType: formData.current[formName].requestType,
                carNecessary: formData.current[formName].extras.carNecessary,
                prescriptionRequired:
                  formData.current[formName].extras.prescriptionRequired,
              }
            : {}
        }
      >
        <Form.Item
          label="Um welche Art von Einkauf geht es?"
          name="requestType"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie an, um welche Art Einkauf es geht.',
            },
          ]}
        >
          <Radio.Group size="large">
            <Radio.Button value="groceries">Lebensmittel</Radio.Button>
            <Radio.Button value="medication">Medikamente</Radio.Button>
            <Radio.Button value="other">Anderes</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Wird für die Einkäufe ein Auto benötigt?"
          name="carNecessary"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie an, ob ein Auto benötigt wird.',
            },
          ]}
        >
          <Radio.Group size="large">
            <Radio.Button value="true">Ja</Radio.Button>
            <Radio.Button value="false">Nein</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Wird ein ärztliches Rezept benötigt?"
          name="prescriptionRequired"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie an, ob ein Rezept benötigt wird.',
            },
          ]}
        >
          <Radio.Group size="large">
            <Radio.Button value="true">Ja</Radio.Button>
            <Radio.Button value="false">Nein</Radio.Button>
          </Radio.Group>
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
  );
}

PlaceRequestWizardCategory.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
};
