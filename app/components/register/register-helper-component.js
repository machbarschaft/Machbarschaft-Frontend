import React from "react"
import {Form, Input, Button, Select, Typography, Card, Timeline, Space, Col, Row} from 'antd'
import {Link, useHistory} from "react-router-dom";
import AuthenticationContext from "../../contexts/authentication";

const {Title} = Typography

export default function RegisterHelperComponent() {
    const authenticationContext = React.useContext(AuthenticationContext)

    const [form] = Form.useForm()
    const history = useHistory();

    const layout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14},
    };

    const handleForm = async (values) => {
        const registerResult = await authenticationContext.performRegister(values.email, values.phone, values.password)
        if (registerResult === true) {
            history.push("/")
        }
    }


    return (
        <>
            <div style={{textAlign: "center"}}>
                <Title level={1}>Mach mit uns deine Nachbarschaften zu Machbarschaften.</Title>
                <Title level={3}>Cool, dass <strong>DU</strong> dabei bist!</Title>
            </div>


            <div className="content-container-default">
                <div className="login-container">
                    <Row type="flex" style={{"alignItems": "center"}}>
                        <Col xs={{span: 24}} xl={{span: 12}} xxl={{span: 12}}>
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
                        </Col>
                        <Col xs={{span: 24}} xl={{span: 12}} xxl={{span: 12}}>
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
                        </Col>
                    </Row>
                </div>
            </div>
        </>

    )
}