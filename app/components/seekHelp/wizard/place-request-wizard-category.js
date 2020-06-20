import React from "react"
import {Row, Col, Typography, Input, Button, Radio, Space, Form} from 'antd';
import PropTypes from "prop-types";
import PlaceRequestWizardNavigation from "./place-request-wizard-navigation";
import PlaceRequestWizardValidationError from "./place-request-wizard-validation-error";

const {Title} = Typography;

/**
 * Default component of seek help wizard.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardCategory({handlePreviousPage, handleNextPage, wizardState}) {
    const [form] = Form.useForm();
    const formName = "place-request-wizard-category";

    const formLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 12},
    };

    return (
        <Space direction={"vertical"} size={"large"} style={{width: '100%'}}>
            <Title level={1}>Welche Art von Hilfe benötigen Sie?</Title>

            <Form
                {...formLayout}
                form={form}
                name={formName}
                hideRequiredMark={true}
                onFinish={(formValues) => handleNextPage(formName, formValues)}
                initialValues={typeof wizardState.formData[formName] != 'undefined' ? {
                    type: wizardState.formData[formName]["type"],
                    car: wizardState.formData[formName]["car"],
                    prescription: wizardState.formData[formName]["prescription"],
                } : {}}>>
                <Form.Item label={"Um welche Art von Einkauf geht es?"} name={"type"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie an, um welche Art Einkauf es geht."
                    }
                ]}>
                    <Radio.Group size={"large"}>
                        <Radio.Button value={"groceries"}>Lebensmittel</Radio.Button>
                        <Radio.Button value={"medicine"}>Medikamente</Radio.Button>
                        <Radio.Button value={"misc"}>Anderes</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label={"Wird für die Einkäufe ein Auto benötigt?"} name={"car"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie an, ob ein Auto benötigt wird."
                    }
                ]}>
                    <Radio.Group size={"large"}>
                        <Radio.Button value={"car"}>Ja</Radio.Button>
                        <Radio.Button value={"no-car"}>Nein</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label={"Wird ein ärztliches Rezept benötigt?"} name={"prescription"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie an, ob ein Rezept benötigt wird."
                    }
                ]}>
                    <Radio.Group size={"large"}>
                        <Radio.Button value={"prescription"}>Ja</Radio.Button>
                        <Radio.Button value={"no-prescription"}>Nein</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {wizardState.hasError && <PlaceRequestWizardValidationError wizardState={wizardState}/>}

                <PlaceRequestWizardNavigation handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>
            </Form>
        </Space>
    )
}

PlaceRequestWizardCategory.propTypes = {
    handleNextPage: PropTypes.func.isRequired,
    handlePreviousPage: PropTypes.func.isRequired,
    wizardState: PropTypes.object.isRequired
}

