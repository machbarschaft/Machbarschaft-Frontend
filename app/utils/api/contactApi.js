import apiCall from './apiCall';

export const postContactRequest = async (formValues) => {
  try {
    return apiCall({
      url: 'contact',
      method: 'POST',
      data: formValues
    });
  } catch (e) {
    throw Error(
      'Beim Absenden der Anfrage ist ein Fehler aufgetreten. Versuchen Sie es später erneut.'
    );
  }
};
