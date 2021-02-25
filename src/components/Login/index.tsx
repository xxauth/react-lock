import React, { useState, useContext } from 'react';

import LoginForm from './LoginForm';
import { message, Alert, Button } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';
import AuthLockContext from '../../context';
import '../../index.less'

const { Tab, Username, Password, Mobile, Captcha, Submit } = LoginForm;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2380157_6nb47ktmtl9.js',
});

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

interface LoginSceneProps {
  onLogin?: (user: any) => void;
  config: Record<string, any>;
}

const LoginScene: React.FC<LoginSceneProps> = ({ onLogin, config }) => {
  const { authClient, setScene } = useContext(AuthLockContext);

  const [loginStatus, setLoginStatus] = useState<string>();
  const [loginType, setLoginType] = useState<string>('mobile');
  const [submitting, setSubmitting] = useState(false);

  const handleLoginSuccess = async user => {
    onLogin?.(user);
  };

  const handleOAuthLogin = (provider: string) => () => {
    authClient.social.authorize(provider, {
      onSuccess: handleLoginSuccess,
      onError: (code, msg) => {
        message.error(msg);
      },
    });
  };

  const handleSubmit = async params => {
    setSubmitting(true);
    try {
      let user;
      if (loginType === 'mobile') {
        user = await authClient.loginByPhoneCode(params.mobile, params.captcha);
      } else if (loginType === 'account') {
        user = await authClient.loginByPhonePassword(
          params.mobile,
          params.password,
        );
      }

      if (user) {
        handleLoginSuccess(user);
      } else {
        // 如果失败去设置用户错误信息
        setLoginStatus('error');
      }
    } catch (error) {
      setLoginStatus('error');
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };

  const handleGetCaptcha = async (mobile: string): Promise<boolean> => {
    if (!/^1\d{10}$/.test(mobile)) {
      message.error('请输入正确的手机号码');
      return false;
    }

    try {
      await authClient.sendSmsCode(mobile);
      return true;
    } catch (e) {
      message.error(e.message);
      return false;
    }
  };

  return (
    <LoginForm
      activeKey={loginType}
      onTabChange={setLoginType}
      onSubmit={handleSubmit}
      className="xauth-login"
    >
      <Tab key="account" tab="密码登录">
        {loginStatus === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="账户或密码错误" />
        )}

        <Username
          name="mobile"
          placeholder="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </Tab>
      <Tab key="mobile" tab="验证码登录">
        {loginStatus === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="验证码错误" />
        )}
        <Mobile
          name="mobile"
          placeholder="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误！',
            },
          ]}
        />
        <Captcha
          name="captcha"
          placeholder="验证码"
          countDown={120}
          getCaptchaButtonText=""
          getCaptchaSecondText="秒"
          onGetCaptcha={handleGetCaptcha}
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        />
      </Tab>
      <Submit loading={submitting}>登录</Submit>
      <div className="xauth-lock-form-actions">
        <Button
          type="link"
          className="xauth-ant-btn xauth-ant-btn-text xauth-guard-text-btn"
          onClick={() => setScene('reset_password')}
        >
          忘记密码？
        </Button>
        <div className="xauth-lock-tip-btn-comb">
          <span className="xauth-guard-tip">还没有账号，</span>
          <Button
            type="link"
            className="xauth-ant-btn xauth-ant-btn-text xauth-guard-text-btn"
            onClick={() => setScene('register')}
          >
            立即注册
          </Button>
        </div>
      </div>
      <div className="social-connections">
        其他登录方式
        {config?.socialConnections?.map((item, i) => (
          <IconFont
            title={parsePlatform(item)}
            key={i.toString()}
            type={`icon-${parsePlatform(item)}`}
            onClick={handleOAuthLogin(item)}
            className="icon"
          />
        ))}
      </div>
    </LoginForm>
  );
};

function parsePlatform(identifier: string): string {
  if (!identifier) return null;

  const items = identifier.split(':');
  if (items.length > 0) {
    return items[0];
  }
  return null;
}

export default LoginScene;
