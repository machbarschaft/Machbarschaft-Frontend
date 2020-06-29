import React from "react"
import {Row, Col, Typography, Input, Button, Radio, Space, Form} from 'antd';
import PropTypes from "prop-types";
import PlaceRequestWizardNavigation from "./place-request-wizard-navigation";
import PlaceRequestWizardValidationError from "./place-request-wizard-validation-error";

const {Title} = Typography;

export default function PlaceRequestWizardUrgency({handlePreviousPage, handleNextPage, wizardState}) {
    const [form] = Form.useForm();
    const formName = "place-request-wizard-urgency";

    const formLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 12},
    };

    return (
        <Space direction={"vertical"} size={"large"} style={{width: '100%'}}>
            <Title level={1}>Wie schnell benötigen Sie die Hilfe?</Title>

            <Form
                {...formLayout}
                form={form}
                name={formName}
                hideRequiredMark={true}
                onFinish={(formValues) => handleNextPage(formName, formValues)}
                initialValues={typeof wizardState.formData[formName] != 'undefined' ? {
                    urgency: wizardState.formData[formName]["urgency"]
                } : {}}
            >
                <Form.Item label={"Wie schnell benötigen Sie die Hilfe?"} name={"urgency"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie an, wie schnell die Hilfe benötigt wird."
                    }
                ]}>
                    <Radio.Group size={"large"}>
                        <Radio.Button value={"now"}>Sehr dringend</Radio.Button>
                        <Radio.Button value={"today"}>Heute</Radio.Button>
                        <Radio.Button value={"tomorrow"}>Morgen</Radio.Button>
                        <Radio.Button value={"this-week"}>Diese Woche</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {wizardState.hasError && <PlaceRequestWizardValidationError wizardState={wizardState}/>}

                <PlaceRequestWizardNavigation handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>
            </Form>
        </Space>
    )
}

PlaceRequestWizardUrgency.propTypes = {
    handleNextPage: PropTypes.func.isRequired,
    handlePreviousPage: PropTypes.func.isRequired,
    wizardState: PropTypes.object.isRequired
}