import React from 'react';
import { Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function useFontSizer() {
  const [fontSize, setFontSize] = React.useState(1);

  const increaseFontSize = () => setFontSize((fontSize) => fontSize + 0.2);

  const decreaseFontSize = () => setFontSize((fontSize) => fontSize - 0.2);

  return [fontSize, { increaseFontSize, decreaseFontSize }];
}
