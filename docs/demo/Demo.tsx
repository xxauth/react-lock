import React, { useState, useRef } from 'react';
import AuthLock from '@xauth/react-lock';

const Demo = () => {
  const handleLogin = e => {
    console.log('登录结果', e);
  };

  return <AuthLock appId="123" onLogin={handleLogin} />;
};

export default Demo;
