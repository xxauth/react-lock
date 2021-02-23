import React, { useContext, useState } from 'react';
import { Tabs, Button, message } from 'antd';
import AuthLockContext from '@/context';
import PhoneRegisterForm from './PhoneRegisterForm';
import EmailRegisterForm from './EmailRegisterForm';
import classnames from 'classnames';

interface RegisterSceneProps {}

const RegisterScene: React.FC<RegisterSceneProps> = ({}) => {
  const { authClient, setScene } = useContext(AuthLockContext);
  const [registerType, setRegisterType] = useState<string>('email');

  const handleEmailRegister = async ({ email, password }) => {
    try {
      await authClient.registerByEmail(email, password);
      message.success('注册成功：' + email);
    } catch (e) {
      message.error('注册失败，请重试！' + e);
    }
  };

  const handlePhoneRegister = async ({ phone, code, password }) => {
    try {
      await authClient.registerByPhoneCode(phone, code, password);
      message.success('注册成功：' + phone);
    } catch (e) {
      message.error('注册失败，请重试！' + e);
    }
  };

  const handleSendCaptcha = async phone => {
    try {
      await authClient.sendSmsCode(phone);
    } catch (e) {
      message.error(e.message);
      throw e;
    }
  };

  return (
    <>
      <Tabs defaultActiveKey={registerType} onChange={setRegisterType} centered>
        <Tabs.TabPane key="email" tab="邮箱注册">
          <EmailRegisterForm onFinish={handleEmailRegister} />
        </Tabs.TabPane>
        <Tabs.TabPane key="phone" tab="手机号注册">
          <PhoneRegisterForm
            onFinish={handlePhoneRegister}
            onSendCaptcha={handleSendCaptcha}
          />
        </Tabs.TabPane>
      </Tabs>
      <div className="xauth-lock-form-actions">
        <div className="xauth-lock-tip-btn-comb">
          <span className="xauth-guard-tip">已有账号，</span>
          <Button
            type="link"
            className={classnames(
              'xauth-ant-btn',
              'xauth-ant-btn-text',
              'xauth-guard-text-btn',
            )}
            onClick={() => setScene('login')}
          >
            立即登录
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterScene;
