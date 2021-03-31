import React from 'react';
import {
  Form,
  Input,
  Typography,
  Button,
  Spin,
  Card,
  notification,
} from 'antd';
import AuthenticationContext from '../../contexts/authentication';
import { updateUser } from '../../utils/api/userApi';
import Geocode from 'react-geocode';
import { googleMapsApiKey } from '../../assets/config/google-maps-api';

Geocode.setApiKey(googleMapsApiKey);

export default function SettingsComponent() {
  const authenticationContext = React.useContext(AuthenticationContext);
  const [preferenceState, setPreferenceState] = React.useState(null);
  const [loadingState, setLoadingState] = React.useState(true);

  React.useEffect(() => {
    if (authenticationContext?.authenticationState) {
      const formValuesAddress = authenticationContext.authenticationState.address;
      setPreferenceState({...formValuesAddress, ...authenticationContext.authenticationState.profile });
      setLoadingState(false);
    }
  }, []);

  const formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 6 },
  };

  const [formProfile] = Form.useForm();
  const formNameProfile = 'profile-form';

  const updateUserHandler = async (formValues) => {
    const authState = authenticationContext.authenticationState;
    const cityValue = formValues.city || authState.address.city;
    const streetValue = formValues.street || authState.address.street;
    const streetNoValue = formValues.streetNo || authState.address.streetNo;
    let locationValue = authState.location;
    const address = `${authState.address.country} ${cityValue} ${streetValue} ${streetNoValue}`;

    const addressResponse = await Geocode.fromAddress(address);

    if (addressResponse.results?.length) {
      locationValue = {
        latitude: addressResponse.results[0].geometry.location.lat,
        longitude: addressResponse.results[0].geometry.location.lng
      };
    }

    const userRequest = {
      city: cityValue,
      email: authState.email,
      firstName: formValues.forename || authState.profile.forename,
      id: authState.uid,
      lastName: formValues.surname || authState.profile.surname,
      location: locationValue,
      phone: authState.phoneNumber,
      source: authState.source,
      street: streetValue,
      streetNo: streetNoValue,
      zipCode: formValues.zipCode || authState.address.zipCode
    };

    updateUser(userRequest)
      .then(() => {
        const { checkAuthentication } = authenticationContext;
        checkAuthentication();
        notification.success({
          message: 'Fertig',
          description: 'Profil erfolgreich gespeichert.',
        });
      })
      .catch((error) => {
        notification.error({ message: 'Fehler', description: error });
      });
  }

  return (
    <div className="content-container-default background-light-grey">
      <Card
        title="Profil"
        headStyle={{ textAlign: 'center', fontSize: '150%' }}
        bodyStyle={{ textAlign: 'center' }}
        bordered={false}
        className="login-card"
      >
        <div className="dashboard-tile-spacing" />
        {
          preferenceState && (
            <Form
              {...formLayout}
              form={formProfile}
              name={formNameProfile}
              hideRequiredMark
              initialValues={preferenceState}
              onFinish={updateUserHandler}
            >
              <Form.Item
                label="Vorname:"
                name="forename"
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: 'Bitte geben Sie Ihren Vornamen an.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nachname:"
                name="surname"
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: 'Bitte geben Sie Ihren Nachnamen an.',
                  },
                ]}
              >
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
              </Form.Item>
              <Form.Item className="center">
                <Button type="primary" htmlType="submit">
                  Speichern
                </Button>
              </Form.Item>
            </Form>
          )
        }
      </Card>
      {loadingState && <Spin size="large" />}
    </div>
  );
}
