---
hero:
  title: AuthLock
  desc: XAuth登录UI组件
  actions:
    - text: 在线Demo
      link: /playground
    - text: 开始使用
      link: /demo
---

### 安装

```bash
npm i @xauth/react-lock
```

### 使用

```js
import React from 'react';
import AuthLock from '@xauth/react-lock';

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <AuthLock appId="123" />
    </div>
  );
};

export default Demo;
```
