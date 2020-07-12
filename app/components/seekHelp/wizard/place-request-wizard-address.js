import React from 'react';
import { Form, Input, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import PlaceRequestWizardNavigation from './place-request-wizard-navigation';
import PlaceRequestWizardValidationError from './place-request-wizard-validation-error';
import AuthenticationContext from '../../../contexts/authentication';

const { Title } = Typography;

/**
 * Default component of seek help wizard. Address is eventually prefilled.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardAddress({
  handlePreviousPage,
  handleNextPage,
  wizardState,
  formData,
}) {
  const authenticationContext = React.useContext(AuthenticationContext);

  const [form] = Form.useForm();
  const formName = 'place-request-wizard-address';

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {authenticationContext.isAuthenticated() ? (
        <Title level={1}>Ist dies weiterhin Ihre richtige Adresse?</Title>
      ) : (
        <Title level={1}>Geben Sie Ihre Adresse ein</Title>
      )}

      <Title level={4}>
        Damit unsere Helferinnen und Helfer Sie später finden, müssen Sie ihre
        Adresse angeben.
      </Title>

      <Form
        {...formLayout}
        form={form}
        name={formName}
        hideRequiredMark
        onFinish={(formValues) => handleNextPage(formName, formValues)}
        initialValues={
          typeof formData.current[formName] !== 'undefined'
            ? {
                street: formData.current[formName].street,
                houseNumber: formData.current[formName].houseNumber,
                zipCode: formData.current[formName].zipCode,
                city: formData.current[formName].city,
              }
            : authenticationContext.isAuthenticated()
            ? {
                street: authenticationContext.authenticationState.address
                  ? authenticationContext.authenticationState.address.street
                  : null,
                houseNumber: authenticationContext.authenticationState.address
                  ? authenticationContext.authenticationState.address
                      .houseNumber
                  : null,
                zipCode: authenticationContext.authenticationState.address
                  ? authenticationContext.authenticationState.address.zipCode
                  : null,
                city: authenticationContext.authenticationState.address
                  ? authenticationContext.authenticationState.address.city
                  : null,
              }
            : {}
        }
      >
        <Form.Item
          label="Straße"
          name="street"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie den Namen Ihrer Straße ein.',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Hausnummer"
          name="houseNumber"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie Ihre Hausnummer ein.',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Postleitzahl"
          name="zipCode"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie Ihre Postleitzahl ein.',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Ort"
          name="city"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie den Namen Ihrer Stadt ein.',
            },
          ]}
        >
          <Input size="large" />
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

PlaceRequestWizardAddress.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
};
