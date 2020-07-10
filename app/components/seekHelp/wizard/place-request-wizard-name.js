import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Space, Typography } from 'antd';
import PlaceRequestWizardNavigation from './place-request-wizard-navigation';
import PlaceRequestWizardValidationError from './place-request-wizard-validation-error';
import AuthenticationContext from '../../../contexts/authentication';

const { Title } = Typography;

/**
 * Default component of seek help wizard. Information may be prefilled.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardName({
  handlePreviousPage,
  handleNextPage,
  wizardState,
  formData,
}) {
  const authenticationContext = React.useContext(AuthenticationContext);

  const [form] = Form.useForm();
  const formName = 'place-request-wizard-name';

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {authenticationContext.isAuthenticated() ? (
        <Title level={1}>
          Hallo
          {authenticationContext.authenticationState.profile.forename}{' '}
          {authenticationContext.authenticationState.profile.surname},
        </Title>
      ) : (
        <Title level={1}>Hallo,</Title>
      )}
      <Title level={4}>
        Wir möchten gerne wissen, wie wir Sie ansprechen dürfen.
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
                forename: formData.current[formName].forename,
                surname: formData.current[formName].surname,
              }
            : authenticationContext.isAuthenticated()
            ? {
                forename:
                  authenticationContext.authenticationState.profile.forename,
                surname:
                  authenticationContext.authenticationState.profile.surname,
              }
            : {}
        }
      >
        <Form.Item
          label="Vorname"
          name="forename"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie Ihren Vornamen ein.',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Nachname"
          name="surname"
          rules={[
            {
              required: true,
              message: 'Bitte geben Sie Ihren Nachnamen ein.',
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

PlaceRequestWizardName.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
};
