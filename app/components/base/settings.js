import React from 'react';
import {
  Form,
  Input,
  Typography,
  Button,
  Switch,
  Spin,
  Card,
  notification,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import AuthenticationContext from '../../contexts/authentication';
import {
  getUserPreferences,
  putUserPreferences,
  putUserProfile,
} from '../../utils/api/userAPI';

const { Title } = Typography;

export default function Settings() {
  const authenticationContext = React.useContext(AuthenticationContext);

  const [expandState, setExpandState] = React.useState(false);
  const [preferenceState, setPreferenceState] = React.useState(null);
  const [loadingState, setLoadingState] = React.useState(true);
  React.useEffect(() => {
    getUserPreferences().then((preferences) => {
      console.log(preferences);
      let formValuesPreference = {
        radius: preferences.radius.toString(),
        notifyNearbyRequests: preferences.notifyNearbyRequests,
        useGps: preferences.useGps,
        country: 'Deutschland',
      };
      if (preferences.staticPosition) {
        formValuesPreference['street'] = preferences.staticPosition.street;
        formValuesPreference[
          'houseNumber'
        ] = preferences.staticPosition.houseNumber.toString();
        formValuesPreference[
          'zipCode'
        ] = preferences.staticPosition.zipCode.toString();
        formValuesPreference['city'] = preferences.staticPosition.city;
        formValuesPreference['country'] = preferences.staticPosition.country;
      }
      setPreferenceState(formValuesPreference);
      setLoadingState(false);
    });
  }, []);

  const formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 6 },
  };

  const [formProfile] = Form.useForm();
  const [formPreferences] = Form.useForm();
  const formNameProfile = 'profile-form';
  const formNamePreferences = 'preferences-form';

  return (
    <div className={'content-container-default background-light-grey'}>
      <Card
        title={'Profil'}
        headStyle={{ textAlign: 'center', fontSize: '150%' }}
        bodyStyle={{ textAlign: 'center' }}
        bordered={false}
        className="login-card"
      >
        <div className={'dashboard-tile-spacing'} />
        <Form
          {...formLayout}
          form={formProfile}
          name={formNameProfile}
          hideRequiredMark={true}
          initialValues={{
            forename:
              authenticationContext.authenticationState.profile.forename,
            surname: authenticationContext.authenticationState.profile.surname,
          }}
          onFinish={(formValues) => {
            putUserProfile(formValues)
              .then(() => {
                notification.success({
                  message: 'Fertig',
                  description: 'Profil erfolgreich gespeichert.',
                });
              })
              .catch((error) => {
                notification.error({ message: 'Fehler', description: error });
              });
          }}
        >
          <Form.Item
            label={'Vorname:'}
            name={'forename'}
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
            label={'Nachname:'}
            name={'surname'}
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
          <Form.Item className={'center'}>
            <Button type="primary" htmlType="submit">
              Speichern
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {loadingState && <Spin size={'large'}></Spin>}
      {!loadingState && (
        <Card
          title={'Einstellungen'}
          headStyle={{ textAlign: 'center', fontSize: '150%' }}
          bodyStyle={{ textAlign: 'center' }}
          bordered={false}
          className="login-card"
        >
          <div className={'dashboard-tile-spacing'} />
          <Form
            {...formLayout}
            form={formPreferences}
            name={formNamePreferences}
            hideRequiredMark={true}
            initialValues={preferenceState}
            onFinish={(formValues) => {
              console.log(formValues);
              putUserPreferences(formValues)
                .then(() => {
                  notification.success({
                    message: 'Fertig',
                    description: 'Einstellungen erfolgreich gespeichert.',
                  });
                })
                .catch((error) => {
                  notification.error({ message: 'Fehler', description: error });
                });
            }}
          >
            <Form.Item label={'Adresse:'} name={'address'}>
              <a
                style={{
                  fontSize: 12,
                }}
                onClick={() => {
                  setExpandState(!expandState);
                }}
              >
                {expandState ? (
                  <>
                    <DownOutlined /> Weniger anzeigen
                  </>
                ) : (
                  <>
                    <UpOutlined /> Mehr anzeigen
                  </>
                )}
              </a>
            </Form.Item>
            <div className={'spacing-left'} hidden={!expandState}>
              <Form.Item
                label={'Straße:'}
                name={'street'}
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
                label={'Hausnummer:'}
                name={'houseNumber'}
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
                label={'Postleitzahl:'}
                name={'zipCode'}
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
                label={'Stadt:'}
                name={'city'}
                rules={[
                  {
                    type: 'string',
                    message: 'Bitte geben Sie Ihre Stadt an.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={'Land:'}
                name={'country'}
                rules={[
                  {
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder={'Deutschland'} />
              </Form.Item>{' '}
            </div>
            <Form.Item
              label={'Radius:'}
              name={'radius'}
              rules={[
                {
                  type: 'string',
                  pattern: '^[0-9]+$',
                  message:
                    'Bitte geben Sie den Radius an in dem Sie nach Aufträgen suchen möchten.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <>
                  Email-Benachrichtigung bei
                  <br /> Aufträgen in der Nähe
                </>
              }
              name={'notifyNearbyRequests'}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label={'GPS erlauben:'}
              name={'useGps'}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item className={'center'}>
              <Button type="primary" htmlType="submit">
                Speichern
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
}
