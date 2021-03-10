import React, {
  forwardRef,
  useState,
  useMemo,
  ForwardRefRenderFunction,
} from 'react';
import { Card } from 'antd';

import { AuthenticationClient } from 'authing-sdk-js';
import { AuthenticationClientOptions } from 'authing-sdk-js/build/main/lib/auth/types';
import LoginScene from '../Login';
import ResetPassword from '../ResetPassword';
import LockContext from '@/context';
import RegisterScene from '../Register';
import _ from 'lodash';

export interface AuthLockConfig {
  target?: HTMLElement; // 指定 Guard 表单的挂载点，接受 querySelector (opens new window)能接受的所有参数或者 dom 元素，若未传入，Guard 会自动生成一个 div 标签放入 body 的最后面
  mode?: any; // Guard 展示模式
  title?: string; // 产品名称
  logo?: string; // 产品 logo
  loginMethods?: any[]; // 需要使用的普通登录(包括 LDAP)方式列表
  registerMethods?: any[]; // 需要使用的注册方式
  defaultRegisterMethod?: any; // 默认展示的注册方式
  defaultScenes?: any[]; // 打开组件时展示的界面
  socialConnections?: string[]; // 需要使用的社会化登录列表
  enterpriseConnections?: string[]; // 需要使用的企业身份源列表(不包括 LDAP)，列表项值为配置的企业身份源唯一标识符，注意：企业身份源需要传入对应 appId 才能使用
  defaultLoginMethod?: string; // 默认显示的登录方式。可选值为 options.loginMethods 中的某一项
  disableRegister?: boolean | false; // 是否禁止注册，禁止的话会隐藏「注册」入口
  disableResetPwd?: boolean | false; // 是否禁止重置密码，禁止的话会隐藏「忘记密码」入口
  clickCloseable?: boolean | false; // Modal 模式时是否隐藏登录框右上角的关闭按钮，如果隐藏，用户将不能通过点击按钮关闭登录框
  escCloseable?: boolean | false; // Modal 模式时是否可以通过键盘 ESC 键关闭登录框
  isSSO?: boolean | false; // 是否是单点登录
  appDomain?: string; // SSO 模式时的 app 域名
  qrCodeScanOptions?: any; // 扫码登录配置
  apiHost?: string; // 私有部署时的 API 请求地址
}

interface AuthLockProps {
  appId: string;
  onLogin?: (user: any) => void;
  onRegister?: (user: any) => void;
  config: AuthLockConfig;
}

const sceneRenders = {
  login: props => <LoginScene {...props} />,
  register: props => <RegisterScene {...props} />,
  reset_password: props => <ResetPassword {...props} />,
};

const AuthLock: ForwardRefRenderFunction<any, AuthLockProps> = (
  { appId, onLogin, onRegister, config },
  ref,
) => {
  let _config: AuthLockConfig = Object.assign(
    {
      registerMethods: ['email', 'phone'],
      defaultRegisterMethod: 'email',
    },
    _.cloneDeep(config),
  );

  const [scene, setScene] = useState('login');

  // 用户认证client，用于网站的登录注册/个人中心编辑等
  const authClient = useMemo(() => {
    const authConfig: AuthenticationClientOptions = {
      appId: appId,
      onError: (code, msg) => {
        console.log(code, msg);
      },
    };
    if (_config?.apiHost) authConfig.host = _config.apiHost;

    return new AuthenticationClient(authConfig);
  }, [config]);

  return (
    <LockContext.Provider
      value={{
        authClient,
        setScene,
      }}
    >
      <Card
        title={_config?.title || '登录'}
        bordered={true}
        style={{ width: '420px' }}
      >
        {sceneRenders[scene]?.({ appId, onRegister, onLogin, config: _config })}
      </Card>
    </LockContext.Provider>
  );
};

export default forwardRef(AuthLock);
