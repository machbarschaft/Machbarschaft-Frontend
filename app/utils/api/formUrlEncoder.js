export const objectToFormUrlEncoded = (formValues) => {
  return Object.keys(formValues)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(formValues[key])}`
    )
    .join('&');
};
