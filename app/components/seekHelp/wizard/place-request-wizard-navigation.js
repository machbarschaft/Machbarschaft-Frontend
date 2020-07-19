import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Form, Space } from 'antd';

export default function PlaceRequestWizardNavigation({
  handlePreviousPage,
  wizardState,
}) {
  return (
    <>
      <Divider />
      <Space>
        <Form.Item>
          {wizardState.currentStep !== 0 && (
            <Button size="large" onClick={handlePreviousPage} htmlType="button">
              Zum vorherigen Schritt
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          {wizardState.currentStep !== 6 && (
            <Button type="primary" size="large" htmlType="submit">
              Zum nächsten Schritt
            </Button>
          )}
        </Form.Item>
      </Space>
    </>
  );
}

PlaceRequestWizardNavigation.propTypes = {
  handlePreviousPage: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
};
