import firebase from '../../components/firebase';
import apiUrl from './apiUrl';

const postRegisterRequest = async (formValues) => {
  const endpoint = `${apiUrl()}/user`;

  const preparedValues = {
    email: formValues.email,
    firstName: formValues.forename,
    lastName: formValues.surname,
    phone: `${formValues.countryCode}${formValues.phone}`,
    source: 'APP',
  };

  const formBody = JSON.stringify(preparedValues);

  const firebaseResult = await firebase
    .auth()
    .createUserWithEmailAndPassword(formValues.email, formValues.password);

  if (firebaseResult.user) {
    const token = firebaseResult.user.ya;
    return fetch(endpoint, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formBody,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
  return firebaseResult;
};

export default postRegisterRequest;
