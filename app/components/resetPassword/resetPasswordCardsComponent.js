import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

function ResetPasswordCardsComponent({ title, contentLeft, contentRight }) {
  return (
    <div className="content-container-default">
      <div className="login-container">
        <Card
          title={title}
          headStyle={{ textAlign: 'center', fontSize: '150%' }}
          bodyStyle={{
            display: 'flex',
            height: 'calc(100% - 62px)',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
          bordered={false}
          className="login-card"
        >
          {contentLeft}
        </Card>
        {contentRight !== undefined && (
          <Card
            className="login-card login-description-card"
            bodyStyle={{
              display: 'flex',
              height: 'calc(100% - 62px)',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '125%',
            }}
          >
            <div>{contentRight}</div>
          </Card>
        )}
      </div>
    </div>
  );
}

ResetPasswordCardsComponent.propTypes = {
  title: PropTypes.string.isRequired,
  contentLeft: PropTypes.node.isRequired,
  contentRight: PropTypes.node,
};

export default ResetPasswordCardsComponent;
