import { Spin } from 'antd';
import React from 'react';

import './styles.css';

export const FullLoader = ({text}) => (
  <div className="full-loader">
    {
      text && <span className="loader-text">{text}</span>
    }
    <Spin size="large" />
  </div>
);
