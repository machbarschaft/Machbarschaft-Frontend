import React from 'react';
import {Button, Input, Space, Typography} from 'antd';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import resetPasswordSubmissionStateReducer from "./resetPasswordSubmissionStateReducer";

const {Text} = Typography;


const passwordSchema = yup.object().shape({
    password: yup.string().required("Bitte geben Sie ein Passwort ein, das die angegebenen Regeln erfüllt"),
    passwordRepeat: yup.string().oneOf([yup.ref("password")], "Die beiden Felder müssen übereinstimmen").required("Die beiden Felder müssen übereinstimmen")
});


function ResetPasswordNewPwdLeftCard({user, token, proceed}) {
    const {register, errors, handleSubmit, setValue, formState} = useForm({
        validationSchema: passwordSchema
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
        console.log("ToDo: send password set request for user '" + user + "', token '" + token + "', password '" + data.password + "' to backend")
        setTimeout(() => {
            dispatchSubmissionState({type: "success"});
            proceed()
        }, 1000);
    }

    React.useEffect(() => {
        register({name: "password"});
        register({name: "passwordRepeat"});
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                <Space direction="vertical" size="small">
                    <Text strong>Passwort</Text>
                    <Input.Password size="large"
                                    name={"password"}
                        /*iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}*/
                                    onChange={(e) => setValue("password", e.target.value)}/>
                    <Text type="danger">{errors.password && <p>{errors.password.message}</p>}</Text>
                    <Text strong>Passwort wiederholen</Text>
                    <Input.Password size="large"
                                    name={"passwordRepeat"}
                        /*iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}*/
                                    onChange={(e) => setValue("passwordRepeat", e.target.value)}/>
                    <Text type="danger">{errors.passwordRepeat && <p>{errors.passwordRepeat.message}</p>}</Text>
                    <Text type={"danger"}>{submissionState.error}</Text>
                    <Button type="primary" htmlType="submit" loading={submissionState.loading}>Passwort setzen</Button>
                </Space>
            </form>
        </>
    );
}

ResetPasswordNewPwdLeftCard.propTypes = {
    user: PropTypes.string.isRequired,
    setToken: PropTypes.string.isRequired,
    proceed: PropTypes.func.isRequired
};

export default ResetPasswordNewPwdLeftCard;