import React from 'react';
import { Space } from 'antd';

export default function Footer() {
  return (
    <footer>
      <Space>
        <a href="/faq">FAQ</a>
        <a href="/datenschutz">Datenschutz</a>
        <a href="/impressum">Impressum</a>
      </Space>
    </footer>
  );
}
