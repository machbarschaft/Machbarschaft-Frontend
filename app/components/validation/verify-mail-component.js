import React from 'react';
import { Result, Spin } from 'antd';
import { getVerifyEmail } from '../../utils/api/verificationApi';
import AuthenticationContext from '../../contexts/authentication';
const queryString = require('query-string');

export default function VerifyMail() {
  const authProps = React.useContext(AuthenticationContext);
  const { authenticationState } = authProps;
  const [loading, setLoading] = React.useState(true);
  const [verificationSuccess, setVerificationSuccess] = React.useState(false);
  const query = queryString.parse(location.search);

  React.useEffect(() => {
    if(!authenticationState.emailVerified) {
      if('token' in query) {
        setLoading(true);
        getVerifyEmail(query.token)
            .then((res) => {
              setVerificationSuccess(true);
              setLoading(false);
            })
            .catch((err) => {
              setVerificationSuccess(false);
              setLoading(false);
            });  
      }
        else {
          setVerificationSuccess(false);
          setLoading(false);
        }
    }
  }, []);

  return (
    <div className="content-container-default">
      {!authenticationState.emailVerified && loading &&
        <Result icon={<Spin size="large" />} />
      }
      {!authenticationState.emailVerified && !loading && !verificationSuccess &&
        <Result
          status="warning"
          title="Die Bestätigung ist fehlgeschlagen, bitte versuchen Sie es erneut."
        />
      }
      {(authenticationState.emailVerified || (!loading && verificationSuccess)) &&
        <Result
          status="success"
          title="Ihre E-Mail Adresse wurde erfolgreich bestätigt!"
          subTitle="Du kannst nun zurück zur Startseite gehen und deinen Account verwenden."
        />
      }
    </div>
  );
}
