import React from 'react';

export const printErrors = (errors) => {
  if (errors.length > 0) {
    let resultString = '';
    for (let i = 0; i < errors.length; i++) {
      resultString += errors[i] + (i !== errors.length - 1 ? <br /> : '');
    }
    return resultString;
  }
  return 'Unbekannter Fehler';
};
