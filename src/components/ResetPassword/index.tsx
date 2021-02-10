import React, { useContext, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Form, Input, Button, message } from 'antd';
import AuthLockContext from '@/context';
import Captcha from '../Captcha';
import Password from 'antd/lib/input/Password';
import { LockTwoTone, MailTwoTone, MobileTwoTone } from '@ant-design/icons';
import classnames from 'classnames';
import styles from '../Login/index.less';

const reEmail = /^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //信箱

interface ResetEmailFormProps {
  initialValues: any;
  onFinish: (values) => void;
  onSendCaptcha: () => Promise<void>;
}

const ResetEmailForm: React.FC<ResetEmailFormProps> = ({
  initialValues,
  onFinish,
  onSendCaptcha,
}) => {
  const [form] = useForm();
  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.Item name="email">
        <Input size="large" disabled prefix={<MailTwoTone />} />
      </Form.Item>
      <Form.Item name="code">
        <Captcha onSendCaptcha={onSendCaptcha} />
      </Form.Item>
      <Form.Item name="password">
        <Password size="large" prefix={<LockTwoTone />} />
      </Form.Item>
      <Button
        size="large"
        type="primary"
        htmlType="submit"
        style={{ width: '100%' }}
      >
        重置密码
      </Button>
    </Form>
  );
};

interface ResetMobileFormProps {
  initialValues: any;
  onFinish: (values) => void;
  onSendCaptcha: () => Promise<void>;
}

const ResetMobileForm: React.FC<ResetMobileFormProps> = ({
  initialValues,
  onFinish,
  onSendCaptcha,
}) => {
  const [form] = useForm();

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.Item name="mobile">
        <Input size="large" disabled prefix={<MobileTwoTone />} />
      </Form.Item>
      <Form.Item name="password">
        <Password size="large" />
      </Form.Item>
      <Form.Item name="code">
        <Captcha onSendCaptcha={onSendCaptcha} />
      </Form.Item>
      <Button
        size="large"
        type="primary"
        htmlType="submit"
        style={{ width: '100%' }}
      >
        重置密码
      </Button>
    </Form>
  );
};

interface ResetPasswordProps {
  config: Record<string, any>;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ config }) => {
  const { authClient, setScene } = useContext(AuthLockContext);

  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();

  const [form] = useForm();

  const handleResetPassword = values => {
    const value = values['value'];
    if (reEmail.test(value)) {
      setEmail(value);
    } else {
      setMobile(value);
    }
  };

  const handleSendCaptcha = async (): Promise<void> => {
    try {
      await authClient.sendSmsCode(mobile);
      return;
    } catch (e) {
      message.error(e.message);
      throw e;
    }
  };

  const handleResetEmailPassword = values => {
    const { email, code, password } = values;
    authClient.resetEmailPassword(email, code, password);
  };

  const handleResetMobilePassword = values => {
    const { mobile, code, password } = values;
    authClient.resetPhonePassword(mobile, code, password);
  };

  const renderContent = (): JSX.Element => {
    if (email) {
      return (
        <ResetEmailForm
          initialValues={{ email }}
          onFinish={handleResetEmailPassword}
          onSendCaptcha={handleSendCaptcha}
        />
      );
    }

    if (mobile) {
      return (
        <ResetMobileForm
          initialValues={{ mobile }}
          onFinish={handleResetMobilePassword}
          onSendCaptcha={handleSendCaptcha}
        />
      );
    }

    return (
      <Form form={form} onFinish={handleResetPassword}>
        <Form.Item name="value">
          <Input size="large" placeholder="请输入手机号或邮箱" />
        </Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
        >
          重置密码
        </Button>
      </Form>
    );
  };

  return (
    <>
      {renderContent()}
      <div className={styles['xauth-lock-form-actions']}>
        <Button
          className={classnames(
            styles['xauth-ant-btn'],
            styles['xauth-ant-btn-text'],
            styles['xauth-guard-text-btn'],
          )}
          type="link"
          onClick={() => setScene('login')}
        >
          其他账号登录
        </Button>
      </div>
    </>
  );
};

export default ResetPassword;
