import React from 'react';
import { Space } from 'antd';
import { NavLink } from 'react-router-dom';

export default function NavigationExample() {
  return (
    <>
      <Space>
        {/* NavLink is given by React Router and used to route to a specified (exact) path. */}
        <NavLink to="/examples/use-state" exact>
          React.useState
        </NavLink>
        <NavLink to="/examples/use-effect" exact>
          React.useEffect
        </NavLink>
        <NavLink to="/examples/use-reducer" exact>
          React.useReducer
        </NavLink>
        <NavLink to="/examples/api-call" exact>
          API Call
        </NavLink>
        <NavLink to="/examples/consumer-provider" exact>
          Consumer / Provider
        </NavLink>
        <NavLink to="/examples/custom-hook" exact>
          Custom Hooks
        </NavLink>
        <NavLink to="/examples/form" exact>
          Forms
        </NavLink>
        <NavLink to="/examples/use-font-sizer" exact>
          Font Size Adjust
        </NavLink>
        <NavLink to="/examples/basic-components" exact>
          Basic Components
        </NavLink>
      </Space>
    </>
  );
}
