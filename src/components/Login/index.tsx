import React, { useState, useContext } from 'react';

import LoginForm from './LoginForm';
import classnames from 'classnames';
import { message, Alert, Button } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';
const { Tab, Username, Password, Mobile, Captcha, Submit } = LoginForm;
import AuthLockContext from '../../context';
import styles from './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_638857_3rs7l9adudz.js',
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

const oauthMap = {
  'wechatwork:service-provider:qrconnect': {
    icon: 'icon-icon-test',
    provider: 'wechatwork:service-provider:qrconnect',
  },
  'wechat:pc': {
    icon: 'icon-we-chat',
    provider: 'wechat:pc',
  },
  'tiktok:pc': {
    icon: 'icon-douyin',
    provider: 'tiktok:pc',
  },
};

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
    try {
      const { code, message: msg } = await authClient.sendSmsCode(mobile);
      if (code !== 0) {
        message.error(msg);
        return false;
      }
      return true;
    } catch (e) {
      message.error(e.message);
      return false;
    }
  };

  const socialConnections = config?.socialConnections
    ?.map(it => oauthMap[it])
    ?.filter(it => !!it);

  return (
    <LoginForm
      activeKey={loginType}
      onTabChange={setLoginType}
      onSubmit={handleSubmit}
      className={styles.login}
    >
      <Tab key="account" tab="密码登录">
        {loginStatus === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="账户或密码错误（admin/ant.design）" />
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
      <div className={styles['xauth-lock-form-actions']}>
        <Button
          type="link"
          className={classnames(
            styles['xauth-ant-btn'],
            styles['xauth-ant-btn-text'],
            styles['xauth-guard-text-btn'],
          )}
          onClick={() => setScene('reset_password')}
        >
          忘记密码？
        </Button>
        <div className={styles['xauth-lock-tip-btn-comb']}>
          <span className={styles['xauth-guard-tip']}>还没有账号，</span>
          <Button
            type="link"
            className={classnames(
              styles['xauth-ant-btn'],
              styles['xauth-ant-btn-text'],
              styles['xauth-guard-text-btn'],
            )}
            onClick={() => setScene('register')}
          >
            立即注册
          </Button>
        </div>
      </div>
      <div className={styles['social-connections']}>
        其他登录方式
        {socialConnections?.map((item, i) => (
          <IconFont
            key={i.toString()}
            type={item.icon}
            onClick={handleOAuthLogin(item.provider)}
            className={styles.icon}
          />
        ))}
      </div>
    </LoginForm>
  );
};

export default LoginScene;
