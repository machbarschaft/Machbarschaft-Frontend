import React from 'react';
import {useLocation} from "react-router-dom";
import {Space, Steps} from "antd";
import ResetPasswordUsernameLeftCard from './resetPasswordUsernameLeftCard';
import ResetPasswordUsernameRightCard from './resetPasswordUsernameRightCard';
import ResetPasswordSecurityCodeLeftCard from './resetPasswordSecurityCodeLeftCard';
import ResetPasswordSecurityCodeRightCard from './resetPasswordSecurityCodeRightCard';
import ResetPasswordNewPwdLeftCard from './resetPasswordNewPwdLeftCard';
import ResetPasswordNewPwdRightCard from './resetPasswordNewPwdRightCard';
import ResetPasswordDoneLeftCard from './resetPasswordDoneLeftCard';
import ResetPasswordCardsComponent from './resetPasswordCardsComponent';

const queryString = require("query-string");

const {Step} = Steps;


export default function ResetPasswordWindow() {
    const location = useLocation();
    const [currentStep, setCurrentStep] = React.useState(0);
    const [user, setUser] = React.useState("");
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        const query = queryString.parse(location.search);
        if ("token" in query && "user" in query) {
            setUser(query.user);
            setToken(query.token);
            setCurrentStep(2);
        }
    }, [location]);
    const steps = [
        {
            title: 'E-Mail/Telefon eingeben',
            content: <ResetPasswordCardsComponent title="E-Mail/Telefon eingeben"
                                                  contentLeft={<ResetPasswordUsernameLeftCard proceed={() => setCurrentStep(1)} setUser={setUser}/>}
                                                  contentRight={<ResetPasswordUsernameRightCard/>}
            />,
        },
        {
            title: 'Sicherheitscode',
            content: <ResetPasswordCardsComponent title="Sicherheitscode eingeben"
                                                  contentLeft={<ResetPasswordSecurityCodeLeftCard proceed={() => setCurrentStep(2)} user={user} setToken={setToken}/>}
                                                  contentRight={<ResetPasswordSecurityCodeRightCard user={user}/>}
            />
        },
        {
            title: 'Neues Passwort setzen',
            content: <ResetPasswordCardsComponent title="Neues Passwort eingeben"
                                                  contentLeft={<ResetPasswordNewPwdLeftCard proceed={() => setCurrentStep(3)} user={user} token={token}/>}
                                                  contentRight={<ResetPasswordNewPwdRightCard/>}
            />
        },
        {
            title: 'Abgeschlossen',
            content: <ResetPasswordCardsComponent title="Erfolgreich abgeschlossen"
                                                  contentLeft={<ResetPasswordDoneLeftCard/>}
            />
        }
    ];
    return (
        <Space direction="vertical" size="large" className="reset-password-container">
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>
            <div className="steps-content">{steps[currentStep].content}</div>
        </Space>
    );
}