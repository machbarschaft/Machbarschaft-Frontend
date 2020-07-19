import React from 'react';
import { Typography } from 'antd';

export default function useFontSizer() {
  const [fontSize, setFontSize] = React.useState(1);

  const increaseFontSize = () =>
    setFontSize((prevFontSize) => prevFontSize + 0.2);

  const decreaseFontSize = () =>
    setFontSize((prevFontSize) => prevFontSize - 0.2);

  return [fontSize, { increaseFontSize, decreaseFontSize }];
}
