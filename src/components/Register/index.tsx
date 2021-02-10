import React, { useContext } from 'react';
import { Tabs, Button } from 'antd';
import AuthLockContext from '@/context';
import MobileRegisterForm from './MobileRegisterForm';
import EmailRegisterForm from './EmailRegisterForm';
import classnames from 'classnames';
import styles from '../Login/index.less';

interface RegisterSceneProps {}

const RegisterScene: React.FC<RegisterSceneProps> = ({}) => {
  const { authClient, setScene } = useContext(AuthLockContext);

  const handleEmailRegister = () => {};

  const handleMobileRegister = () => {};

  const handleSendCaptcha = async () => {
    return;
  };

  return (
    <>
      <Tabs activeKey="email" centered>
        <Tabs.TabPane key="email" tab="邮箱注册">
          <EmailRegisterForm
            onFinish={handleEmailRegister}
            onSendCaptcha={handleSendCaptcha}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="phone" tab="手机号注册">
          <MobileRegisterForm
            onFinish={handleMobileRegister}
            onSendCaptcha={handleSendCaptcha}
          />
        </Tabs.TabPane>
      </Tabs>
      <div className={styles['xauth-lock-form-actions']}>
        <div className={styles['xauth-lock-tip-btn-comb']}>
          <span className={styles['xauth-guard-tip']}>已有账号，</span>
          <Button
            type="link"
            className={classnames(
              styles['xauth-ant-btn'],
              styles['xauth-ant-btn-text'],
              styles['xauth-guard-text-btn'],
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
