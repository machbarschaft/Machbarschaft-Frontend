import React from 'react';
import {useHistory, Link} from "react-router-dom";
import {Card, Input, Space, Button, Typography, Timeline} from 'antd';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {MailOutlined} from '@ant-design/icons';
import AuthenticationContext from "../../contexts/authentication";
import PropTypes from 'prop-types';
import validateDisjunction from "../../utils/inputValidationFunctions/validateDisjunction";

const {Text} = Typography;

yup.addMethod(yup.string, "or", validateDisjunction);
const formSchema = yup.object().shape({
    user: yup.
          string().
          or([yup.string().email(), yup.number().positive().integer()], "Die Eingabe ist keine Telefonnummer und keine E-Mail").
          required("Bitte geben Sie Ihre Telefonnummer oder E-Mail Adresse ein"),
    password: yup.string().required("Bitte geben Sie Ihr Passwort ein")
});

function LoginWindow({location: {username} = ""}) {
    const authenticationContext = React.useContext(AuthenticationContext);

    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: formSchema
    });
    const history = useHistory();

    function onSubmit(data) {
        authenticationContext.performAuthentication(data.user, data.password);
    }

    React.useEffect(() => {
        if (authenticationContext.authenticationState.uid != null) {
            history.push("/")
        }
    }, [authenticationContext.authenticationState]);

    React.useEffect(() => {
        register({name: "user"});
        register({name: "password"});
        setValue("user", username);
    }, []);


    return (
        <div className="content-container-default">
            <div className="login-container">
                <Card title="Login"
                      headStyle={{textAlign: "center", fontSize: "150%"}}
                      bodyStyle={{textAlign: "center"}}
                      bordered={false}
                      className="login-card"
                >
                    <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                        <Space direction="vertical" size="small">
                            <Text strong>Telefonnummer oder E-Mail Adresse</Text>
                            <Input size="large"
                                   name={"user"}
                                   suffix={<MailOutlined/>}
                                   onChange={(e) => setValue("user", e.target.value)}
                                   defaultValue={username}/>
                            <Text type="danger">{errors.user && <p>{errors.user.message}</p>}</Text>
                            <Text strong>Passwort</Text>
                            <Input.Password size="large"
                                            name={"password"}
                                            onChange={(e) => setValue("password", e.target.value)}/>
                            <Text type="danger">{errors.password && <p>{errors.password.message}</p>}</Text>
                            <Text type={"danger"}>{authenticationContext.authenticationState.authenticationErrors != null && authenticationContext.authenticationState.authenticationErrors}</Text>
                            <Button type="primary" htmlType="submit" loading={authenticationContext.authenticationState.isAuthenticating}>Anmelden</Button>
                        </Space>
                    </form>
                </Card>
                <Card className="login-card login-description-card">
                    <Timeline>
                        <Timeline.Item>
                            Bitte geben Sie Ihre Telefonnummer oder E-Mail-Adresse und Ihr Passwort ein.
                        </Timeline.Item>
                        <Timeline.Item>
                            Passwort vergessen? Dann klicken sie bitte hier:<br/>
                            <Link to={"/resetpassword"}><Button className="login-description-card-button">Passwort zurücksetzen</Button></Link>
                        </Timeline.Item>
                        <Timeline.Item>
                            Wenn Sie noch keinen Account erstellt haben:<br/>
                            <Button className="login-description-card-button" type="primary">Registrieren</Button>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </div>
        </div>
    );
}
LoginWindow.propTypes = {
    location: PropTypes.shape({
        username: PropTypes.string
    })
}

export default LoginWindow;