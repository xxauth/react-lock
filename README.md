# xauth react 登录组件

xauth 是一个企业级身份认证提供商，其集成了 OAuth、LDAP、OIDC 等多种身份认证和授权解决方案。此仓库包含了 xauth 提供的 React 认证/授权 UI 组件。

## Lock

Lock 是一种可嵌入的登录表单，可根据你的需求进行配置，建议用于单页面应用程序。 它使你可以轻松添加各种社会化登录方式，以便你的用户可以无缝登录，并且在不同平台拥有一致的登录体验。
Lock 拥有以下基本功能：

- 登录：
  - 账号密码登录（包括手机号 + 密码、邮箱 + 密码、用户名 + 密码）；
  - 手机验证码登录；
  - 微信小程序扫码登录（需先在后台配置）；
  - APP 扫码登录（需要接入 APP 扫码登录）；
  - 小程序扫码登录（需先在后台配置）；
  - 社会化登录（需要配置社会化登录）；
  - 企业身份源登录（需要配置企业身份源）；
- 注册：
  - 账号密码注册；
  - 手机验证码注册；
  - 忘记密码以及重置密码；
  - MFA 认证；
  - 响应式特性（兼容移动端和 PC 端）；
  - 完整的 UI 自定义功能；
  - 兼容主流前端 UI 库：
  - 原生 JavaScript 调用；
  - Vue 组件；
  - React 组件；
  - Angular 组件
  - React Native 组件
  - Android 组件
  - iOS 组件
  - Flutter 组件

### 安装

```bash
npm i @xauth/react-lock
```

### 使用

```js
import React from 'react';
import AuthLock from '@xauth/react-lock';

const Demo = () => {
  const handleLogin = user => {
    console.log('登录结果', user);
  };

  return <AuthLock appId="abc" onLogin={handleLogin} />;
};

export default Demo;
```


### 模块开发规范
- 模块开发中不建议使用 CssModules 的主要原因, 导致项目无法替换样式


#### dumiu框架构建的产物，在项目中引用导致样式丢失
1. .fatherrc.js
中配置 extractCSS: true