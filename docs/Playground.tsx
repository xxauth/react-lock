import React, { useState, useRef } from 'react';
import AuthLock from '@xauth/react-lock';

const Demo = () => {
  const handleLogin = e => {
    console.log('登录结果', e);
  };
  const handleRegister = e => {
    console.log('注册结果', e);
  };
  const config = {
    // registerMethods: ['phone'],
    // defaultRegisterMethod: 'phone',
    socialConnections: [
      'wechat-pc',
      'wechatwork-service-provider-qrconnect',
      'tiktok-pc',
    ],
  };

  return (
    <AuthLock
      appId="261ec84ac2e64522b25270380fd1e4d0"
      config={config}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
};

export default Demo;
