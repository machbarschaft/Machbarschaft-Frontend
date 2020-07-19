import React from 'react';

export default function useFontSizer() {
  const [fontSize, setFontSize] = React.useState(1);

  const increaseFontSize = () =>
    setFontSize((prevFontSize) => prevFontSize + 0.2);

  const decreaseFontSize = () =>
    setFontSize((prevFontSize) => prevFontSize - 0.2);

  return [fontSize, { increaseFontSize, decreaseFontSize }];
}
