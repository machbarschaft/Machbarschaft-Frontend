import React from "react"
import {Form, Input, Button, Select, Typography, Card, Timeline} from 'antd'
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons'
import {Link} from "react-router-dom";
import AuthenticationContext from "../../contexts/authentication";

const {Title} = Typography

export default function RegisterHelperComponent() {
    const authenticationContext = React.useContext(AuthenticationContext)

    const [form] = Form.useForm()

    const [passwordVisible, setPasswordVisible] = React.useState(false)

    const layout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14},
    };

    const handleForm = (values) => {
        authenticationContext.performRegister(values.email, values.phone, values.password)
    }


    return (
        <>
            <div style={{textAlign: "center"}}>
                <Title level={1}>Mach mit uns deine Nachbarschaften zu Machbarschaften.</Title>
                <Title level={3}>Cool, dass <strong>DU</strong> dabei bist!</Title>
            </div>


            <div className="content-container-default">
                <div className="login-container">
                    <Card title="Registrieren"
                          headStyle={{textAlign: "center", fontSize: "150%"}}
                          bodyStyle={{textAlign: "center"}}
                          bordered={false}
                          className="login-card"
                    >

                        <Form {...layout} form={form} name={"register-helper"} style={{width: "100%"}} onFinish={handleForm}>
                            <Form.Item name={"email"} label={"Deine E-Mail Adresse"} rules={[
                                {
                                    required: true
                                }
                            ]}>
                                <Input/>
                            </Form.Item>

                            <Form.Item name={"phone"} label={"Deine Handynummer"} rules={[
                                {
                                    required: true
                                }
                            ]}>
                                <Input/>
                            </Form.Item>

                            <Form.Item name={"password"} label={"Dein Passwort"} rules={[
                                {
                                    required: true
                                }
                            ]}>
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item>
                                <Button type={"primary"} htmlType={"submit"}>Registrieren</Button>
                            </Form.Item>
                        </Form>

                    </Card>

                    <Card className="login-card"
                          title="So funktioniert's"
                          headStyle={{textAlign: "center", fontSize: "150%"}}
                          bodyStyle={{textAlign: "center"}}
                          bordered={false}>
                        <Timeline>
                            <Timeline.Item>
                                Super, dass du in deiner Nachbarschaft helfen möchtest!
                            </Timeline.Item>
                            <Timeline.Item>
                                Um loszulegen, brauchen wir nur einige Informationen über dich. Für deinen Nutzeraccount benötigen wir deine <strong>E-Mail Adresse</strong>.
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </div>
            </div>
        </>

    )
}