import { Button, Card, Form, Input, notification } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Geocode from 'react-geocode';

import useDashboard from '../../../hooks/useDashboard';
import { updateUser } from '../../../utils/api/userApi';
import { googleMapsApiKey } from '../../../assets/config/google-maps-api';
import AuthenticationContext from '../../../contexts/authentication';

Geocode.setApiKey(googleMapsApiKey);

export default function AdminEdit() {
  const [requestsState, {fetchAdmins}] = useDashboard('helper');
  const [userState, setUserState] = React.useState(null);
  const authenticationContext = React.useContext(AuthenticationContext);
  const history = useHistory();
  const [formProfile] = Form.useForm();
  const { id } = useParams();

  const formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 6 },
  };
  const formNameProfile = 'profile-form';

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (requestsState.adminsResult?.length) {
      setUserState(requestsState.adminsResult.find(admin => admin.id === id));
    }
  }, [requestsState.adminsResult]);

  const updateUserHandler = async (formValues) => {
    const cityValue = formValues.city || userState.city;
    const streetValue = formValues.street || userState.street;
    const streetNoValue = formValues.streetNo || userState.streetNo;
    let locationValue = userState.location;
    const address = `De ${cityValue} ${streetValue} ${streetNoValue}`;

    const addressResponse = await Geocode.fromAddress(address);

    if (addressResponse.results?.length) {
      locationValue = {
        latitude: addressResponse.results[0].geometry.location.lat,
        longitude: addressResponse.results[0].geometry.location.lng
      };
    }

    const userRequest = {
      city: cityValue,
      email: userState.email,
      firstName: formValues.firstName || userState.firstName,
      id: userState.id,
      lastName: formValues.lastName || userState.lastName,
      location: locationValue,
      phone: userState.phone,
      source: userState.source,
      street: streetValue,
      streetNo: streetNoValue,
      zipCode: formValues.zipCode || userState.zipCode
    };

    authenticationContext.startLoading();
    updateUser(userRequest)
      .then(() => {
        authenticationContext.finishLoading();
        notification.success({
          message: 'Fertig',
          description: 'Profil erfolgreich gespeichert.',
        });
        history.push(`/admins`);
      })
      .catch((error) => {
        authenticationContext.finishLoading();
        notification.error({ message: 'Fehler', description: error });
      });
  };

  return (
    <div className="content-container-default background-light-grey">
      {
        userState && (
          <Card
            title={`Profil (${userState.email})`}
            headStyle={{ textAlign: 'center', fontSize: '150%' }}
            bodyStyle={{ textAlign: 'center' }}
            bordered={false}
            className="login-card"
          >
            <div className="dashboard-tile-spacing"/>
            <Form
              {...formLayout}
              form={formProfile}
              name={formNameProfile}
              hideRequiredMark
              initialValues={userState}
              onFinish={updateUserHandler}
            >
              <Form.Item
                label="Vorname:"
                name="firstName"
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: 'Bitte geben Sie Ihren Vornamen an.',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Nachname:"
                name="lastName"
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: 'Bitte geben Sie Ihren Nachnamen an.',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Straße:"
                name="street"
                rules={[
                  {
                    type: 'string',
                    message: 'Bitte geben Sie Ihre Straße an.',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Hausnummer:"
                name="streetNo"
                rules={[
                  {
                    type: 'string',
                    pattern: '^[0-9]+$',
                    message:
                      'Bitte geben Sie nur Ihre Hausnummer ohne Zusatz an.',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Postleitzahl:"
                name="zipCode"
                rules={[
                  {
                    type: 'string',
                    pattern: '^[0-9]+$',
                    message: 'Bitte geben Sie Ihre Postleitzahl an.',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Stadt:"
                name="city"
                rules={[
                  {
                    type: 'string',
                    message: 'Bitte geben Sie Ihre Stadt an.',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item className="center">
                <Button type="primary" htmlType="submit">
                  Speichern
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )
      }
    </div>
  );
}
