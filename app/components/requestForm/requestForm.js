import { Button, Form, Input } from 'antd';
import React from 'react';

export const RequestForm = ({initialValues, onFinish, onFinishFailed}) => (
  <>
    <Form
      name="basic"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Vor- und Nachname"
        name="fullName"
        rules={[{ required: true, message: 'Bitte geben Sie einen Hilfesuchenden ein.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Telefonnummer"
        name="phone"
        rules={[{ required: true, message: 'Bitte geben Sie eine Telefonnummer ein.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Aufgabenbeschreibung"
        name="requestText"
        rules={[{ required: true, message: 'Bitte geben Sie einen Aufgabenbeschreibung ein.' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Straße:"
        name="street"
        rules={[
          {
            required: true,
            type: 'string',
            message: 'Bitte geben Sie Ihre Straße an.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Hausnummer:"
        name="streetNo"
        rules={[
          {
            required: true,
            type: 'string',
            pattern: '^[0-9]+$',
            message:
              'Bitte geben Sie nur Ihre Hausnummer ohne Zusatz an.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Postleitzahl:"
        name="zipCode"
        rules={[
          {
            required: true,
            type: 'string',
            pattern: '^[0-9]+$',
            message: 'Bitte geben Sie Ihre Postleitzahl an.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Stadt:"
        name="city"
        rules={[
          {
            required: true,
            type: 'string',
            message: 'Bitte geben Sie Ihre Stadt an.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Speichern
        </Button>
      </Form.Item>
    </Form>
  </>
);
