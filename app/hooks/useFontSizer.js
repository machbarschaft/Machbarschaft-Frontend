import React from 'react';
import { Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function useFontSizer() {
  const [fontSize, setFontSize] = React.useState(1);

  const increaseFontSize = () => setFontSize((fontSize) => fontSize + 0.20);

  const decreaseFontSize = () => setFontSize((fontSize) => fontSize - 0.20);

  return [fontSize, { increaseFontSize, decreaseFontSize }];
}
