import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import {Card, Input, Space, Button, Typography, Timeline} from 'antd';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {MailOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';

const {Text} = Typography;

// https://github.com/jquense/yup/issues/743
yup.addMethod(yup.string, "or", function(schemas, msg) {
    return this.test({
        name: "or",
        message: "Die Eingabe ist keine Telefonnummer und keine E-Mail" || msg,
        test: value => {
            if(Array.isArray(schemas) && schemas.length > 1) {
                const resee = schemas.map(schema => schema.isValidSync(value));
                return resee.some(res => res);
            } else {
                throw new TypeError("Schemas is not correct array schema");
            }
        },
        exclusive: false
    });
});

const formSchema = yup.object().shape({
    user: yup.string().or([yup.string().email(), yup.number().positive().integer()]).required("Bitte geben Sie Ihre Telefonnummer oder E-Mail Adresse ein"),
    password: yup.string().required("Bitte geben Sie Ihr Passwort ein")
});

function LoginWindow(props) {
    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: formSchema
    });
    const [credentialsError, setCredentialsError] = React.useState("");
    const history = useHistory();

    function onSubmit(data) {
        setCredentialsError("");

        return new Promise(resolve => {
            props.verifyAuthentication(data.user, data.password).then(
                () => history.push("/")
            ).catch(
                () => {
                    setCredentialsError("Bitte überprüfen Sie die eigegebenen Zugangsdaten!");
                    resolve();
                }
            );
        });
    }

    React.useEffect(() => {
        register({name: "user"});
        register({name: "password"});
        if(typeof(props.location.username) !== undefined) setValue("user",  props.location.username);
    }, []);


    return (
        <div className="content-container-default"><div className="login-container">
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
                               defaultValue={typeof(props.location.username) !== undefined ? props.location.username : ""} />
                        <Text type="danger">{errors.user && <p>{errors.user.message}</p>}</Text>
                        <Text strong>Passwort</Text>
                        <Input.Password size="large"
                                        name={"password"}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        onChange={(e) => setValue("password", e.target.value)}/>
                        <Text type="danger">{errors.password && <p>{errors.password.message}</p>}</Text>
                        <Text type="danger">{credentialsError}</Text>
                        <Button type="primary" htmlType="submit" loading={formState.isSubmitting}>Anmelden</Button>
                    </Space>
                </form>
            </Card>
            <Card className="login-card login-description-card">
                <Timeline>
                    <Timeline.Item>
                        Bitte geben Sie links Ihre Telefonnummer oder E-Mail-Adresse und Ihr Passwort ein.
                    </Timeline.Item>
                    <Timeline.Item>
                        Passwort vergessen? Dann klicken sie bitte hier:<br />
                        <Button className="login-description-card-button">Passwort zurücksetzen</Button>
                    </Timeline.Item>
                    <Timeline.Item>
                        Wenn Sie noch keinen Account erstellt haben:<br />
                        <Button className="login-description-card-button" type="primary">Registrieren</Button>
                    </Timeline.Item>
                </Timeline>
            </Card>
        </div></div>
    );
}

export default LoginWindow;