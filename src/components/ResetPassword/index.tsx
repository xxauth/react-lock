import React, { useContext, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Form, Input, Button, message } from 'antd';
import AuthLockContext from '@/context';
import Captcha from '../Captcha';
import Password from 'antd/lib/input/Password';
import { LockTwoTone, MailTwoTone, MobileTwoTone } from '@ant-design/icons';
import classnames from 'classnames';
import styles from '../Login/index.less';
import { EmailScene } from 'authing-sdk-js';

const reEmail = /^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //信箱

interface ResetEmailFormProps {
  initialValues: any;
  onFinish: (values) => void;
}

const ResetEmailForm: React.FC<ResetEmailFormProps> = ({
  initialValues,
  onFinish,
}) => {
  const [form] = useForm();
  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <h3>
        重置密码邮件已发送至邮箱 {initialValues['email']} 有效期为 24 小时。
      </h3>
      <Form.Item name="email" hidden></Form.Item>
      <Form.Item name="code">
        <Input placeholder="4位验证码" />
      </Form.Item>
      <Form.Item name="password">
        <Password size="large" placeholder="新密码" prefix={<LockTwoTone />} />
      </Form.Item>
      <Form.Item>
        <Password
          size="large"
          placeholder="再输入一次密码"
          prefix={<LockTwoTone />}
        />
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

interface ResetPhoneFormProps {
  initialValues: any;
  onFinish: (values) => void;
  onSendCaptcha: () => Promise<void>;
}

const ResetPhoneForm: React.FC<ResetPhoneFormProps> = ({
  initialValues,
  onFinish,
  onSendCaptcha,
}) => {
  const [form] = useForm();

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.Item name="phone">
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
  const [phone, setPhone] = useState();

  const [form] = useForm();

  const handleResetPassword = async values => {
    const value = values['value'];
    if (reEmail.test(value)) {
      try {
        const { code, message: msg } = await authClient.sendEmail(
          value,
          EmailScene.ResetPassword,
        );

        if (code !== 0) {
          message.error(msg);
        } else {
          setEmail(value);
        }
      } catch (e) {
        message.error(e.message);
      }
    } else {
      setPhone(value);
    }
  };

  const handleSendCaptcha = async (): Promise<void> => {
    try {
      await authClient.sendSmsCode(phone);
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

  const handleResetPhonePassword = values => {
    const { phone, code, password } = values;
    authClient.resetPhonePassword(phone, code, password);
  };

  const renderContent = (): JSX.Element => {
    if (email) {
      return (
        <ResetEmailForm
          initialValues={{ email }}
          onFinish={handleResetEmailPassword}
        />
      );
    }

    if (phone) {
      return (
        <ResetPhoneForm
          initialValues={{ phone }}
          onFinish={handleResetPhonePassword}
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
