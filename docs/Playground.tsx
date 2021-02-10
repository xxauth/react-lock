import React, { useState, useRef } from 'react';
import AuthLock from '@xauth/react-lock';

const Demo = () => {
  const handleLogin = e => {
    console.log('登录结果', e);
  };

  const config = {
    socialConnections: [
      'wechat:pc',
      'wechatwork:service-provider:qrconnect',
      'tiktok:pc',
    ],
  };

  return <AuthLock appId="123" onLogin={handleLogin} config={config} />;
};

export default Demo;
