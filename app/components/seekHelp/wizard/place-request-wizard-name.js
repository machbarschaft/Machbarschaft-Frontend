import React from "react"
import PropTypes from 'prop-types'
import {Row, Col, Typography, Input, Button, Space, Form} from 'antd';
import PlaceRequestWizardNavigation from "./place-request-wizard-navigation";
import PlaceRequestWizardValidationError from "./place-request-wizard-validation-error";

const {Title} = Typography;

/**
 * Default component of seek help wizard. Information may be prefilled.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardName({handlePreviousPage, handleNextPage, wizardState}) {
    const [form] = Form.useForm();
    const formName = "place-request-wizard-name";

    const formLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
    };

    return (
        <Space direction={"vertical"} size={"large"} style={{width: '100%'}}>
            <Title level={1}>Hallo Max Schmidt,</Title>
            <Title level={4}>Wir möchten gerne wissen, wie wir Sie ansprechen dürfen.</Title>

            <Form
                {...formLayout}
                form={form}
                name={formName}
                hideRequiredMark={true}
                onFinish={(formValues) => handleNextPage(formName, formValues)}
                initialValues={typeof wizardState.formData[formName] != 'undefined' ? {
                    forename: wizardState.formData[formName]["forename"],
                    surname: wizardState.formData[formName]["surname"],
                } : {}}>
                <Form.Item label={"Vorname"} name={"forename"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie Ihren Vornamen ein."
                    }
                ]}>
                    <Input size={"large"}/>
                </Form.Item>
                <Form.Item label={"Nachname"} name={"surname"} rules={[
                    {
                        required: true,
                        message: "Bitte geben Sie Ihren Nachnamen ein."
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

PlaceRequestWizardName.propTypes = {
    handleNextPage: PropTypes.func.isRequired,
    handlePreviousPage: PropTypes.func.isRequired,
    wizardState: PropTypes.object.isRequired
}