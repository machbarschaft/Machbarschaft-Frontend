import React from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthenticationContext from '../../contexts/authentication';

const { Title, Text } = Typography;

export default function RegisterHelpseekerComponent({
  countryCode,
  phone,
  forename,
  surname,
}) {
  const authenticationContext = React.useContext(AuthenticationContext);
  const history = useHistory();

  const specialCharacters = ['!', '#', ';', '-', '_', '$', '%', '&', '+'];
  const questions = [
    'Wo sind Sie geboren?',
    'Was ist Ihr Hobby?',
    'Wie lautet der Nachname Ihres ersten Lehrers/Ihrer ersten Lehrerin?',
    'Wie viele Geschwister hat Ihr Vater?',
    'Wie viele Cousins und Cousinen haben Sie?',
  ];

  const generatePassword = (data) => {
    let password =
      data.answer1.toString() +
      data.answer2.toString() +
      data.answer3.toString() +
      specialCharacters[getRandomInt(specialCharacters.length)] +
      specialCharacters[getRandomInt(specialCharacters.length)];
    password = password.replace(/\s/g, ''); // remove whitespace
    while (password.length < 12) {
      password += specialCharacters[getRandomInt(specialCharacters.length)];
    }
    setPasswordState(password);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function pickQuestionsRandomly() {
    form.resetFields(['answer1', 'answer2', 'answer3']);
    const newSetQuestions = [];
    while (newSetQuestions.length < 3) {
      const currentQuestion = questions[getRandomInt(5)];
      if (!newSetQuestions.includes(currentQuestion))
        newSetQuestions.push(currentQuestion);
    }
    setCurrentQuestionsState(newSetQuestions);
  }
  const [errorState, setErrorState] = React.useState(null);

  const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };


  class SignInHandler extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = event => {
      const { email, password } = this.state;
  
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          this.setState({ error });
        });
  
      event.preventDefault();
    };


    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  }


  const handleForm = async (email, password) => {
    const registerResult = await authenticationContext.performRegister(
      email,
      phone,
      countryCode,
      password,
      forename,
      surname
    );
    if (registerResult === true) {
      history.push('/');
    } else
      setErrorState(
        'Es ist ein Fehler aufgetreten: ' +
          authenticationContext.authenticationState.registerErrors
      );
  };

  const formLayoutVertical = {
    labelCol: { span: 21 },
    wrapperCol: { span: 21 },
  };

  const [showFormState, setShowFormState] = React.useState('start');
  const [emailState, setEmailState] = React.useState('');
  const [passwordState, setPasswordState] = React.useState('');
  const [currentQuestionsState, setCurrentQuestionsState] = React.useState([
    '',
    '',
    '',
  ]);

  const [form] = Form.useForm();
  const formNameEmail = 'email-form';
  const formNamePassword = 'password-questions-form';

  return (
    <>
      <div className="dashboard-tile register-component">
        <Title level={3}>Jetzt registrieren</Title>
        <div className="dashboard-tile-spacing" />
        {showFormState === 'start' && (
          <Button
            type="primary"
            onClick={() => {
              setShowFormState('email');
            }}
          >
            Start
          </Button>
        )}

        {showFormState === 'email' && (
          <>
            <Form
              {...formLayoutVertical}
              layout="vertical"
              form={form}
              name={formNameEmail}
              hideRequiredMark
              onFinish={(formValues) => {
                setEmailState(formValues.email);
                pickQuestionsRandomly();
                setShowFormState('questions');
              }}
            >
              <Form.Item
                label="Bitte geben Sie ihre Email-Adresse an:"
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Sie müssen Ihre Email-Adresse angeben.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item className="register-component">
                <Button type="primary" htmlType="submit">
                  Weiter
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {showFormState === 'questions' && (
          <Form
            {...formLayoutVertical}
            layout="vertical"
            form={form}
            name={formNamePassword}
            hideRequiredMark
            onFinish={(formValues) => {
              generatePassword(formValues);
              setShowFormState('summary');
            }}
          >
            <Form.Item
              label={currentQuestionsState[0]}
              name="answer1"
              rules={[
                {
                  required: true,
                  message: 'Bitte beantworten Sie die Frage.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={currentQuestionsState[1]}
              name="answer2"
              rules={[
                {
                  required: true,
                  message: 'Bitte beantworten Sie die Frage.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={currentQuestionsState[2]}
              name="answer3"
              rules={[
                {
                  required: true,
                  message: 'Bitte beantworten Sie die Frage.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="register-component">
              <Button type="primary" onClick={() => setShowFormState('email')}>
                Zurück
              </Button>
              <Button className="spacing-left" type="primary" htmlType="submit">
                Weiter
              </Button>
            </Form.Item>
          </Form>
        )}

        {showFormState === 'summary' && (
          <>
            Ihr Passwort: {passwordState} <br /> Bitte notieren Sie sich ihr
            Passwort.
            <br />
            <div className="horizontal-container space-top">
              <Button
                type="primary"
                onClick={() => {
                  pickQuestionsRandomly();
                  setShowFormState('questions');
                }}
              >
                Zurück
              </Button>
              <Button
                className="spacing-left"
                type="primary"
                onClick={() => handleForm(emailState, passwordState)}
              >
                Abschicken
              </Button>
            </div>
            <br />
            <Text type="danger">{errorState}</Text>
          </>
        )}
      </div>
    </>
  );
}

RegisterHelpseekerComponent.propTypes = {
  countryCode: PropTypes.number.isRequired,
  phone: PropTypes.string.isRequired,
  forename: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};
