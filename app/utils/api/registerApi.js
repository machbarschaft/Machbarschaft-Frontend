import firebase from '../../components/firebase';
import apiCall from './apiCall';

const postRegisterRequest = async (formValues) => {
  const preparedValues = {
    email: formValues.email,
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
    localStorage.setItem('token', token);

    return apiCall({
      url: 'user',
      method: 'POST',
      data: preparedValues
    });
  }
  return firebaseResult;
};

export default postRegisterRequest;
