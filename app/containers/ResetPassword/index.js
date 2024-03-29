import React from 'react';
import { useLocation } from 'react-router-dom';
import { Space, Steps } from 'antd';
import ResetPasswordUsernameLeftCard from '../../components/resetPassword/resetPasswordUsernameLeftCard';
import ResetPasswordUsernameRightCard from '../../components/resetPassword/resetPasswordUsernameRightCard';
import ResetPasswordCardsComponent from '../../components/resetPassword/resetPasswordCardsComponent';
import ResetPasswordFinalStep from '../../components/resetPassword/resetPasswordFinalStep';

const queryString = require('query-string');

const { Step } = Steps;

export default function ResetPasswordWindow() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [user, setUser] = React.useState('');
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const query = queryString.parse(location.search);
    if ('token' in query && 'user' in query) {
      setUser(query.user);
      setToken(query.token);
      setCurrentStep(2);
    }
  }, [location]);
  const steps = [
    {
      title: 'E-Mail/Telefon eingeben',
      content: (
        <ResetPasswordCardsComponent
          title="E-Mail/Telefon eingeben"
          contentLeft={
            <ResetPasswordUsernameLeftCard
              proceed={() => setCurrentStep(1)}
              setUser={setUser}
            />
          }
          contentRight={<ResetPasswordUsernameRightCard />}
        />
      ),
    },
    {
      title: 'Abgeschlossen',
      content: (
        <ResetPasswordCardsComponent
          title="Abgeschlossen"
          contentLeft={
            <ResetPasswordFinalStep />
          }
        />
      ),
    }
  ];
  return (
    <Space
      direction="vertical"
      size="large"
      className="reset-password-container"
    >
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
    </Space>
  );
}
