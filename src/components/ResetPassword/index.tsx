import React, { useContext, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Form, Input, Button, message } from 'antd';
import AuthLockContext from '@/context';
import Captcha from '../Captcha';
import Password from 'antd/lib/input/Password';
import { LockTwoTone, MobileTwoTone } from '@ant-design/icons';
import { EmailScene } from 'authing-sdk-js';

const reEmail = '\\w+([-.]w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'; //信箱
const rePhone = '1\\d{10}';

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
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
      >
        <Input placeholder="验证码" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入新密码',
          },
        ]}
      >
        <Password size="large" placeholder="新密码" prefix={<LockTwoTone />} />
      </Form.Item>
      <Form.Item
        name="re-password"
        rules={[
          {
            required: true,
            message: '请输入确认密码',
          },
        ]}
      >
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
    <Form
      form={form}
      initialValues={initialValues}
      validateTrigger="onSubmit"
      onFinish={onFinish}
    >
      <Form.Item name="phone">
        <Input size="large" disabled prefix={<MobileTwoTone />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入新密码' }]}
      >
        <Password size="large" placeholder="新密码" prefix={<LockTwoTone />} />
      </Form.Item>
      <Form.Item
        name="re-password"
        rules={[
          { required: true, message: '请输入确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('必须和密码一致!');
            },
          }),
        ]}
      >
        <Password
          size="large"
          placeholder="再输入一次密码"
          prefix={<LockTwoTone />}
        />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message: '请输入短信验证码' }]}
      >
        <Captcha
          onSendCaptcha={() => {
            const phone = form.getFieldValue('phone');
            if (!new RegExp(`^${rePhone}$`).test(phone)) {
              message.error('请输入正确的手机号码!');
              return Promise.reject();
            }
            return onSendCaptcha();
          }}
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

    if (new RegExp(`^${reEmail}$`).test(value)) {
      try {
        const { code, message: msg } = await authClient.sendEmail(
          value,
          EmailScene.ResetPassword,
        );
        console.log('message', msg);
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
      await authClient.sendResetPasswordSmsCode(phone);
      return;
    } catch (e) {
      message.error(e.message);
    }
  };

  const handleResetEmailPassword = async values => {
    const { email, code, password } = values;
    try {
      await authClient.resetEmailPassword(email, code, password);
      setScene('login');
      message.success('密码修改成功!');
    } catch (e) {
      message.error(e.message);
    }
  };

  const handleResetPhonePassword = async values => {
    const { phone, code, password } = values;
    try {
      await authClient.resetPhonePassword(phone, code, password);
      setScene('login');
      message.success('密码修改成功!');
    } catch (e) {
      message.error(e.message);
    }
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
        <Form.Item
          name="value"
          rules={[
            {
              required: true,
              message: '请输入手机号或邮箱',
            },
            {
              pattern: new RegExp(`^${reEmail}|${rePhone}$`),
              message: '请输入正确的手机号或邮箱',
            },
          ]}
        >
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
      <div className="xauth-lock-form-actions">
        <Button
          className="xauth-ant-btn xauth-ant-btn-text  xauth-guard-text-btn"
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
