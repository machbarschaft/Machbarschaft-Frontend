import React from 'react'
import {Input, Button, Typography} from 'antd';
import {PhoneOutlined} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import * as yup from "yup";

const {Text} = Typography;

const wrongFormatMessage = "Die Eingabe ist keine Telefonnummer";
const formSchema = yup.object().shape({
    phone: yup.number().
               positive().
               integer().
               typeError(wrongFormatMessage).
               required("Bitte geben Sie Ihre Telefonnummer ein")
});

export default function WelcomeSection() {
    const {register, errors, handleSubmit, getValues, setValue, formState} = useForm({
        validationSchema: formSchema
    });
    const history = useHistory();

    React.useEffect(() => {
        register({name: "phone"})
    }, []);

    function onSubmit(data) {
        history.push({pathname: "/login", username: "0"+data.phone});
    }

    return (
        <div className="landing-page-container content-container-default">
            <div className="landing-page-split-element">
                <div>
                    <h1>MACHBARSCHAFT</h1>
                    MACHBARSCHAFT ist eine Nachbarschaftshilfe für Menschen ohne Internetzugang oder Internetkompetenz.<br /><br />
                    Mehr als 10 Mio. Menschen in Deutschland sind über 60, vom Virus besonders gefährdet und hilfsbedürftig - aber ohne Internet.<br /><br />
                    Wir entwickeln eine Lösung, die für alle erreichbar ist: Einen technologie-gestützten Telefonservice, bei dem ältere Nachbar:innen ihre Anfragen für Einkäufe abgeben können. Zusammen mit einer App, in der freiwillige Helfer:innen Anfragen in der Nähe annehmen können.<br /><br />
                    Mit unserer technologischen Plattform und künstlicher Intelligenz können wir schnell, sicher und skalierbar Hilfe zur Hilfe leisten.
                </div>
                <div style={{textAlign: 'center'}}>
                    <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                        <Input size="large"
                               name={"phone"}
                               placeholder="Ihre Telefonnummer"
                               onChange={(e) => setValue("phone", e.target.value)}
                               prefix={<PhoneOutlined />} /><br /><br />
                        <Text type="danger">{errors.phone && <p>{errors.phone.message}</p>}</Text>
                        <Button type="primary" htmlType="submit">Hilfe anfordern</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}