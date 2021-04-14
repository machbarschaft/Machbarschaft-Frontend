import React from 'react';
import { useHistory } from 'react-router-dom';
import { Space, Form, Input, Button, notification } from 'antd';
import Geocode from 'react-geocode';
import { createHelpRequest } from '../../utils/api/placeRequestApi';
import placeRequestReducer from '../../contexts/placeRequest/placeRequestReducer';
import { ERROR, LOADED } from '../../contexts/placeRequest/types';
import AuthenticationContext from '../../contexts/authentication';
import { googleMapsApiKey } from '../../assets/config/google-maps-api';
import { updateUser } from '../../utils/api/userApi';

Geocode.setApiKey(googleMapsApiKey);

export default function PlaceRequestWindow(props) {
  const history = useHistory();
  const [address, setAddress] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const authenticationContext = React.useContext(AuthenticationContext);

  const [wizardState, dispatch] = React.useReducer(placeRequestReducer, {
    currentStep: 0,
    formData: [],
    isValidating: false,
    isLoading: true,
    hasError: false,
    errorMsg: '',
  });

  React.useEffect(() => {
    if (authenticationContext?.authenticationState) {
      setProfile({
        fullName: `${authenticationContext.authenticationState.profile.forename} ${authenticationContext.authenticationState.profile.surname}`,
        phone: authenticationContext.authenticationState.phoneNumber
      });
      setAddress(authenticationContext.authenticationState.address);
    } else {
      setAddress({
        city: '',
        street: '',
        streetNo: '',
        zipCode: ''
      });
      setProfile({
        fullName: '',
        phone: ''
      });
    }
  }, []);

  const onFinish = async (values) => {
    const authState = authenticationContext.authenticationState;
    const helpSeeker = {
      fullName: values.fullName,
      phone: values.phone,
      source: 'ADMIN'
    };

    await createHelpRequest(helpSeeker, values.requestText);

    const cityValue = values.city || authState.address.city;
    const streetValue = values.street || authState.address.street;
    const streetNoValue = values.streetNo || authState.address.streetNo;
    const zipCodeValue = values.zipCode || authState.address.zipCode;
    const address = `${authState.address.country} ${cityValue} ${streetValue} ${streetNoValue}`;
    const addressResponse = await Geocode.fromAddress(address);

    if (addressResponse.results?.length) {
      const locationValue = {
        latitude: addressResponse.results[0].geometry.location.lat,
        longitude: addressResponse.results[0].geometry.location.lng
      };

      const userRequest = {
        city: cityValue,
        email: authState.email,
        firstName: authState.profile.forename,
        id: authState.uid,
        lastName: authState.profile.surname,
        location: locationValue,
        phone: authState.phoneNumber,
        source: authState.source,
        street: streetValue,
        streetNo: streetNoValue,
        zipCode: zipCodeValue
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

    dispatch({
      type: LOADED,
    });

    history.push('dashboard');
  };

  const onFinishFailed = (errorInfo) => {
    dispatch({
      type: ERROR,
      data: errorInfo,
    });
  };

  return (
    <Space
      direction="vertical"
      size="large"
      className="content-container-default"
    >
      {
        address && (
          <Form
            name="basic"
            initialValues={{...address, ...profile, remember: true }}
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
        )
      }
    </Space>
  );
}
