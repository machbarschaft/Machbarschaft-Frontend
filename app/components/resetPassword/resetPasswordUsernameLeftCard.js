import React from 'react';
import {Button, Input, Space, Typography} from 'antd';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import resetPasswordSubmissionStateReducer from "./resetPasswordSubmissionStateReducer";
import validateDisjunction from "../../utils/inputValidationFunctions/validateDisjunction";

const {Text} = Typography;

yup.addMethod(yup.string, "or", validateDisjunction);
const userSchema = yup.object().shape({
    user: yup.string().or([yup.string().email(), yup.number().positive().integer()], "Die Eingabe muss eine Telefonnummer oder E-Mail sein").required("Bitte geben Sie Ihre Telefonnummer oder E-Mail Adresse ein")
});


function ResetPasswordUsernameLeftCard({setUser, proceed}) {
    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: userSchema
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
        setUser(data.user);
        console.log("ToDo: send reset request for user '" + data.user + "' to backend");
        setTimeout(() => {
            dispatchSubmissionState({type: "success"});
            proceed();
        }, 1000);
    }

    React.useEffect(() => {
        register({name: "user"});
    }, []);
    return (
        <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
            <Space direction="vertical" size="small">
                <Input size="large"
                       name={"user"}
                       onChange={(e) => setValue("user", e.target.value)}
                />
                <Text type="danger">{errors.user && <p>{errors.user.message}</p>}</Text>
                <Text type={"danger"}>{submissionState.error}</Text>
                <Button type="primary" htmlType="submit" loading={submissionState.loading}>Anfrage abschicken</Button>
            </Space>
        </form>
    );
}

ResetPasswordUsernameLeftCard.propTypes = {
    setUser: PropTypes.func.isRequired,
    proceed: PropTypes.func.isRequired
};

export default ResetPasswordUsernameLeftCard;