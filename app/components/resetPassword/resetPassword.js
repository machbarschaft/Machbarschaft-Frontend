import React from 'react';
import ReactDOM from 'react-dom';
import {Link, useLocation} from "react-router-dom";
import {Steps, Space, Button, Card, Input, message, Result, Typography} from 'antd';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
const queryString = require('query-string');

const {Step} = Steps;
const {Text} = Typography;



yup.addMethod(yup.string, "or", function (schemas, msg) {
    return this.test({
        name: "or",
        message: "Die Eingabe ist keine Telefonnummer und keine E-Mail" || msg,
        test: value => {
            if (Array.isArray(schemas) && schemas.length > 1) {
                const resee = schemas.map(schema => schema.isValidSync(value));
                return resee.some(res => res);
            } else {
                throw new TypeError("Schemas is not correct array schema");
            }
        },
        exclusive: false
    });
});
const userSchema = yup.object().shape({
    user: yup.string().or([yup.string().email(), yup.number().positive().integer()]).required("Bitte geben Sie Ihre Telefonnummer oder E-Mail Adresse ein")
});
const codeErrorMsg = "Bitte geben Sie den 5 stelligen Code ein";
const codeSchema = yup.object().shape({
    code: yup.number().min(10000, codeErrorMsg).max(99999, codeErrorMsg).required(codeErrorMsg)
});
const passwordSchema = yup.object().shape({
    password: yup.string().required("Bitte geben Sie ein Passwort ein, das die angegebenen Regeln erfüllt"),
    passwordRepeat: yup.string().oneOf([yup.ref("password")], "Die beiden Felder müssen übereinstimmen").required("Die beiden Felder müssen übereinstimmen")
});


function ResetPasswordUsernameLeftCard(props) {
    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: userSchema
    });
    const [errorState, setErrorState] = React.useState("");
    const [loadingState, setLoadingState] = React.useState(false);

    function onSubmit(data) {
        setErrorState("");
        setLoadingState(true);
        props.setUser(data.user);
        console.log("ToDo: send reset request for user '" + data.user + "' to backend");
        setTimeout(() => props.proceed(), 1000);
    }

    React.useEffect(() => {
        register({name: "user"});
    }, []);
    return (
        <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
            <Space direction="vertical" size="small">
                <Input size="large"
                       name={"user"}
                       onChange={(e) => setValue("user", e.target.value)}
                />
                <Text type="danger">{errors.user && <p>{errors.user.message}</p>}</Text>
                <Text type={"danger"}>{errorState}</Text>
                <Button type="primary" htmlType="submit" loading={loadingState}>Anfrage abschicken</Button>
            </Space>
        </form>
    );
}
function ResetPasswordUsernameRightCard() {
    return (
        <>
            Bitte geben Sie Ihre E-Mail Adresse oder Telefonnummer in das Eingabefeld ein und
            klicken Sie dann auf <Text strong>Anfrage abschicken</Text>.<br /><br />
            Im nächsten Schritt müssen Sie einen Sicherheitscode eingeben.<br />
            Wenn Sie Ihre E-Mail Adresse eingeben, wird eine E-Mail mit diesem Code an Sie gesendet.<br />
            Bei Eingabe einer Telefonnummer wird Sie unser
            automatischer Telefonservice umgehend anrufen und den Sicherheitscode mitteilen.<br />
            Sobald Sie den Code eingegeben haben, können Sie ein neues Passwort setzen.
        </>
    );
}

function ResetPasswordSecurityCodeLeftCard(props) {
    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: codeSchema
    });
    const [errorState, setErrorState] = React.useState("");
    const [loadingState, setLoadingState] = React.useState(false);

    function onSubmit(data) {
        setErrorState("");
        setLoadingState(true);
        console.log("ToDo: send security code check request for user '" + props.user + "', code '" + data.code + "' to backend");
        props.setToken("demo_token");
        setTimeout(() => props.proceed(), 1000);
    }

    React.useEffect(() => {
        register({name: "code"});
    }, []);
    return (
        <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
            <Space direction="vertical" size="small">
                <Input size="large"
                       name={"code"}
                       onChange={(e) => setValue("code", e.target.value)}
                />
                <Text type="danger">{errors.code && <p>{errors.code.message}</p>}</Text>
                <Text type={"danger"}>{errorState}</Text>
                <Button type="primary" htmlType="submit" loading={loadingState}>Code bestätigen</Button>
            </Space>
        </form>
    );
}
function ResetPasswordSecurityCodeRightCard(props) {
    const [state, setState] = React.useState(false);

    function sendRequest() {
        setState(true);
        console.log("ToDo: send reset request for user '" + props.user + "' to backend");
        setTimeout(() => {
            setState(false);
            message.success("Anfrage erfolgreich verschickt!");
        }, 1000);
    }

    return (
        <>
            Die Anfrage wurde erfolgreich verschickt!<br />
            Sobald Sie den Code per E-Mail oder Telefon erhalten haben, geben Sie diesen bitte im Eingabefeld ein und klicken
            <Text strong>Code bestätigen</Text>.<br /><br />
            Wenn keine E-Mail angekommen oder kein Telefonanruf eingegangen ist, dann klicken Sie bitte hier:<br /><br />
            <Button onClick={() => sendRequest()} loading={state}>Anfrage erneut senden</Button>
        </>
    );
}

function ResetPasswordNewPwdLeftCard(props) {
    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: passwordSchema
    });
    const [errorState, setErrorState] = React.useState("");
    const [loadingState, setLoadingState] = React.useState(false);

    function onSubmit(data) {
        setErrorState("");
        setLoadingState(true);
        console.log("ToDo: send password set request for user '" + props.user + "', token '" + props.token + "', password '" + data.password + "' to backend")
        setTimeout(() => props.proceed(), 1000);
    }

    React.useEffect(() => {
        register({name: "password"});
        register({name: "passwordRepeat"});
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                <Space direction="vertical" size="small">
                    <Text strong>Passwort</Text>
                    <Input.Password size="large"
                                    name={"password"}
                                    /*iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}*/
                                    onChange={(e) => setValue("password", e.target.value)}/>
                    <Text type="danger">{errors.password && <p>{errors.password.message}</p>}</Text>
                    <Text strong>Passwort wiederholen</Text>
                    <Input.Password size="large"
                                    name={"passwordRepeat"}
                                    /*iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}*/
                                    onChange={(e) => setValue("passwordRepeat", e.target.value)}/>
                    <Text type="danger">{errors.passwordRepeat && <p>{errors.passwordRepeat.message}</p>}</Text>
                    <Text type={"danger"}>{errorState}</Text>
                    <Button type="primary" htmlType="submit" loading={loadingState}>Passwort setzen</Button>
                </Space>
            </form>
        </>
    );
}
function ResetPasswordNewPwdRightCard() {
    return (
        <>
            Sie können jetzt ein neues Passwort setzen.<br />
            Es muss den folgenden Reglen entsprechen:<br />
            ToDo
        </>
    );
}


function ResetPasswordDoneLeftCard() {
    return (
        <Result
            status="success"
            title="Das Passwort wurde erfolgreich zurückgesetzt!"
            subTitle="Sie können sich jetzt einloggen, klicken Sie dazu auf den Login Button:"
            extra={[
                <Link to={"/login"} key="login"><Button type="primary">Jetzt einloggen</Button></Link>
            ]}
        />
    );
}


function ResetPasswordCardsComponent(props) {
    return (
        <div className="content-container-default">
            <div className="login-container">
                <Card title={props.title}
                      headStyle={{textAlign: "center", fontSize: "150%"}}
                      bodyStyle={{display: "flex", height: "calc(100% - 62px)", justifyContent: "center", alignItems: "center", textAlign: "center"}}
                      bordered={false}
                      className="login-card"
                >
                    {props.contentLeft}
                </Card>
                {"contentRight" in props &&
                    <Card className="login-card login-description-card"
                          bodyStyle={{display: "flex", height: "calc(100% - 62px)", justifyContent: "center", alignItems: "center", fontSize: "125%"}}
                    >
                        <div>{props.contentRight}</div>
                    </Card>
                }
            </div>
        </div>
    );
}

function ResetPasswordWindow(props) {
    const location = useLocation();
    const [state, setState] = React.useState(0);
    const [user, setUser] = React.useState("");
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        const query = queryString.parse(location.search);
        if("token" in query && "user" in query) {
            setUser(query.user);
            setToken(query.token);
            setState(2);
        }
    }, [location]);
    const steps = [
        {
            title: 'E-Mail/Telefon eingeben',
            content: <ResetPasswordCardsComponent title="E-Mail/Telefon eingeben"
                                                  contentLeft={<ResetPasswordUsernameLeftCard proceed={() => setState(1)} setUser={setUser} />}
                                                  contentRight={<ResetPasswordUsernameRightCard />}
                     />,
        },
        {
            title: 'Sicherheitscode',
            content: <ResetPasswordCardsComponent title="Sicherheitscode eingeben"
                                                  contentLeft={<ResetPasswordSecurityCodeLeftCard proceed={() => setState(2)} user={user} setToken={setToken} />}
                                                  contentRight={<ResetPasswordSecurityCodeRightCard user={user} />}
                     />
        },
        {
            title: 'Neues Passwort setzen',
            content: <ResetPasswordCardsComponent title="Neues Passwort eingeben"
                                                  contentLeft={<ResetPasswordNewPwdLeftCard proceed={() => setState(3)} user={user} token={token} />}
                                                  contentRight={<ResetPasswordNewPwdRightCard />}
                     />
        },
        {
            title: 'Abgeschlossen',
            content: <ResetPasswordCardsComponent title="Erfolgreich abgeschlossen"
                                                  contentLeft={<ResetPasswordDoneLeftCard />}
                     />
        }
    ];
    return (
        <Space direction="vertical" size="large" style={{width: "80%", marginLeft: "10%", marginTop: "3em"}}>
            <Steps current={state}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[state].content}</div>
        </Space>
    );
}

export default ResetPasswordWindow;