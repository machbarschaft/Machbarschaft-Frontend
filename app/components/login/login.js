import React from 'react';
import ReactDOM from 'react-dom';
import {Card, Input, Space, Button, Typography} from 'antd';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {MailOutlined, EyeInvisibleOutlined} from '@ant-design/icons';

const {Text} = Typography;

const formSchema = yup.object().shape({
    user: yup.string().email().required(),
    password: yup.string().required()
});

function LoginWindow() {
    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: formSchema
    });

    function onSubmit(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data);
            }, 2000);
        });
    }

    React.useEffect(() => {
        register({name: "user"})
        register({name: "password"})
    }, [])


    return (
        <div className="content-container-default centered">
            <Card title="Login"
                  headStyle={{textAlign: "center", fontSize: "150%"}}
                  bodyStyle={{textAlign: "center"}}
                  bordered={false}
                  className="login-card"
            >
                <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                    <Space direction="vertical" size="small">
                        <Text strong>Telefonnummer oder E-Mail Adresse</Text>
                        <Input size="large" name={"user"} prefix={<MailOutlined/>} onChange={(e) => setValue("user", e.target.value)}/>
                        {errors.user && <p>{errors.user.message}</p>}
                        <Text strong>Passwort</Text>
                        <Input size="large" name={"password"} prefix={<EyeInvisibleOutlined/>} onChange={(e) => setValue("password", e.target.value)}/>
                        {errors.password && <p>{errors.password.message}</p>}
                        <Button type="primary" htmlType="submit" loading={formState.isSubmitting}>Anmelden</Button>
                    </Space>
                </form>
            </Card>
        </div>
    );
}

export default LoginWindow;