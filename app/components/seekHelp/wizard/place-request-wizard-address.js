import React from "react"
import {Row, Col, Typography, Input, Button, Space, Form} from 'antd';
import PropTypes from "prop-types";
import PlaceRequestWizardNavigation from "./place-request-wizard-navigation";
import PlaceRequestWizardValidationError from "./place-request-wizard-validation-error";

const {Title} = Typography;

/**
 * Default component of seek help wizard. Address is eventually prefilled.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardAddress({handlePreviousPage, handleNextPage, wizardState}) {
    const [form] = Form.useForm();
    const formName = "place-request-wizard-address";

    const formLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
    };

    return (
        <Space direction={"vertical"} size={"large"} style={{width: '100%'}}>
            <Title level={1}>Ist dies weiterhin Ihre richtige Adresse?</Title>
            <Title level={4}>Damit unsere Helferinnen und Helfer Sie später finden, müssen Sie ihre Adresse angeben.</Title>

            <Form
                {...formLayout}
                form={form}
                name={formName}
                hideRequiredMark={true}
                onFinish={(formValues) => handleNextPage(formName, formValues)}
                initialValues={typeof wizardState.formData[formName] != 'undefined' ? {
                    street: wizardState.formData[formName]["street"],
                    number: wizardState.formData[formName]["number"],
                    postcode: wizardState.formData[formName]["postcode"],
                    city: wizardState.formData[formName]["city"],
                } : {}}
            >
                <Form.Item label={"Straße"} name={"street"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie den Namen Ihrer Straße ein."
                    }
                ]}>
                    <Input size={"large"}/>
                </Form.Item>
                <Form.Item label={"Hausnummer"} name={"number"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie Ihre Hausnummer ein."
                    }
                ]}>
                    <Input size={"large"}/>
                </Form.Item>
                <Form.Item label={"Postleitzahl"} name={"postcode"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie Ihre Postleitzahl ein."
                    }
                ]}>
                    <Input size={"large"}/>
                </Form.Item>
                <Form.Item label={"Ort"} name={"city"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie den Namen Ihrer Stadt ein."
                    }
                ]}>
                    <Input size={"large"}/>
                </Form.Item>

                {wizardState.hasError && <PlaceRequestWizardValidationError wizardState={wizardState}/>}

                <PlaceRequestWizardNavigation handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>
            </Form>

        </Space>
    )
}

PlaceRequestWizardAddress.propTypes = {
    handleNextPage: PropTypes.func.isRequired,
    handlePreviousPage: PropTypes.func.isRequired,
    wizardState: PropTypes.object.isRequired
}