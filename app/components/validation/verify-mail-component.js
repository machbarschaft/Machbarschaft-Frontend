import React from 'react';
import { Result, Spin } from 'antd';
import { getVerifyEmail } from '../../utils/api/verificationApi';
const queryString = require('query-string');

export default function VerifyMail() {
  const [loading, setLoading] = React.useState(true);
  const [verificationSuccess, setVerificationSuccess] = React.useState(false);
  const query = queryString.parse(location.search);

  React.useEffect(() => {
    if('token' in query) {
      console.log("verify mail for token: ", token);
      setLoading(true);
      getVerifyEmail(token)
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
  }, []);

  return (
    <div className="content-container-default">
      {loading &&
        <Result icon={<Spin size="large" />} />
      }
      {!loading && !verificationSuccess &&
        <Result
          status="warning"
          title="Die Bestätigung ist fehlgeschlagen, bitte versuchen Sie es erneut."
        />
      }
      {!loading && verificationSuccess &&
        <Result
          status="success"
          title="Ihre E-Mail Adresse wurde erfolgreich bestätigt!"
        />
      }
    </div>
  );
}
