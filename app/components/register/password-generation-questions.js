import React from 'react'
import {useForm} from "react-hook-form";
import {Form, Input, Radio, Typography} from 'antd';
import * as yup from "yup";
import PlaceRequestWizardValidationError from "../seekHelp/wizard/place-request-wizard-validation-error";
import PlaceRequestWizardNavigation from "../seekHelp/wizard/place-request-wizard-navigation";

const {Title} = Typography

function PasswordGenerationQuestions() {
    const specialCharacters = ['!', ',', '.', '#', ';', '-', '_', '$', '%', '&', '+'];

    const onSubmit = (data) => {
        let password = data.input1 + data.input2 + data.input3;
        if(password.toString().length ) {}
    }

    const formLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 12},
    };

    const [form] = Form.useForm();
    const formName = "register-after-request";

    /* As we are using Ant-Design, we need to register form fields manually during first build of a component. This can be done in a useEffect hook. */
    React.useEffect(() => {
        register({name: "input1"})
        register({name: "input2"})
        register({name: "input3"})
    }, [])

    return (
        <>
            <Title level={3}>Form Validation</Title>

            <Form
                {...formLayout}
                form={form}
                name={formName}
                hideRequiredMark={true}
                onFinish={(formValues) => handleNextPage(formName, formValues)}
                initialValues={typeof wizardState.formData[formName] != 'undefined' ? {
                    requestType: wizardState.formData[formName]["requestType"],
                    carNecessary: wizardState.formData[formName]["carNecessary"],
                    prescriptionRequired: wizardState.formData[formName]["prescriptionRequired"],
                } : {}}>
                <Form.Item label={"Um welche Art von Einkauf geht es?"} name={"requestType"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie an, um welche Art Einkauf es geht."
                    }
                ]}>
                    <Radio.Group size={"large"}>
                        <Radio.Button value={"groceries"}>Lebensmittel</Radio.Button>
                        <Radio.Button value={"medication"}>Medikamente</Radio.Button>
                        <Radio.Button value={"other"}>Anderes</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label={"Wird für die Einkäufe ein Auto benötigt?"} name={"carNecessary"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie an, ob ein Auto benötigt wird."
                    }
                ]}>
                    <Radio.Group size={"large"}>
                        <Radio.Button value={"true"}>Ja</Radio.Button>
                        <Radio.Button value={"false"}>Nein</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label={"Wird ein ärztliches Rezept benötigt?"} name={"prescriptionRequired"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie an, ob ein Rezept benötigt wird."
                    }
                ]}>
                    <Radio.Group size={"large"}>
                        <Radio.Button value={"true"}>Ja</Radio.Button>
                        <Radio.Button value={"false"}>Nein</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {wizardState.hasError && <PlaceRequestWizardValidationError wizardState={wizardState}/>}

                <PlaceRequestWizardNavigation handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>
            </Form>
        </>

    )
}