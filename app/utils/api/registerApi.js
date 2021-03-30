import firebase from '../../components/firebase';
import apiCall from './apiCall';

const postRegisterRequest = async (formValues) => {
  const preparedValues = {
    ...formValues,
    firstName: formValues.forename,
    lastName: formValues.surname,
    phone: `${formValues.countryCode}${formValues.phone}`,
    source: 'APP',
  };

  const firebaseResult = await firebase
    .auth()
    .createUserWithEmailAndPassword(formValues.email, formValues.password);

  if (firebaseResult.user) {
    const token = firebaseResult.user.ya;
    const refreshToken = firebaseResult.user.refreshToken;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);

    return apiCall({
      url: 'user',
      method: 'POST',
      data: preparedValues
    });
  }
  return firebaseResult;
};

export default postRegisterRequest;
