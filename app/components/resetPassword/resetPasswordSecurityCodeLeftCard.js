import React from 'react';
import {Button, Input, Space, Typography} from 'antd';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import resetPasswordSubmissionStateReducer from "./resetPasswordSubmissionStateReducer";

const {Text} = Typography;

const codeErrorMsg = "Bitte geben Sie den 5 stelligen Code ein";
const codeSchema = yup.object().shape({
    code: yup.number().min(10000, codeErrorMsg).max(99999, codeErrorMsg).required(codeErrorMsg)
});

function ResetPasswordSecurityCodeLeftCard({user, setToken, proceed}) {
    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: codeSchema
    });

    const [submissionState, dispatchSubmissionState] = React.useReducer(
        resetPasswordSubmissionStateReducer,
        {
            error: null,
            loading: false
        }
    );

    function onSubmit(data) {
        dispatchSubmissionState({type: "submit"});
        console.log("ToDo: send security code check request for user '" + user + "', code '" + data.code + "' to backend");
        setToken("demo_token");
        setTimeout(() => {
            dispatchSubmissionState({type: "success"});
            proceed();
        }, 1000);
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
                <Text type={"danger"}>{submissionState.error}</Text>
                <Button type="primary" htmlType="submit" loading={submissionState.loading}>Code bestätigen</Button>
            </Space>
        </form>
    );
}

ResetPasswordSecurityCodeLeftCard.propTypes = {
    user: PropTypes.string.isRequired,
    setToken: PropTypes.func.isRequired,
    proceed: PropTypes.func.isRequired
};

export default ResetPasswordSecurityCodeLeftCard;