import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { LockTwoTone, MobileTwoTone } from '@ant-design/icons';
import Password from 'antd/lib/input/Password';
import Captcha from '../Captcha';

interface PhoneRegisterFormProps {
  initialValues?: any;
  onFinish?: (values: any) => void;
  onSendCaptcha?: (phone: string) => Promise<void>;
}

const PhoneRegisterForm: React.FC<PhoneRegisterFormProps> = ({
  initialValues,
  onFinish,
  onSendCaptcha,
}) => {
  const [form] = useForm();

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.Item
        name="phone"
        rules={[
          { required: true, message: '请输入手机号码' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号码' },
        ]}
      >
        <Input prefix={<MobileTwoTone />} placeholder="请输入手机号码"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
          { pattern: /^.{6,}$/, message: '密码长度至少为 6 位' },
        ]}
      >
        <Password prefix={<LockTwoTone />}  placeholder="请输入密码"/>
      </Form.Item>
      <Form.Item
        name="confirm"
        rules={[
          {
            required: true,
            message: '请输入确认密码!',
          },
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
        <Password prefix={<LockTwoTone />} placeholder="请输入确认密码"/>
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message: '请输入短信验证码' }]}
      >
        <Captcha
          onSendCaptcha={() => {
            const phone = form.getFieldValue('phone');
            if (!/^1\d{10}$/.test(phone)) {
              message.error('请输入正确的手机号码!');
              return Promise.reject();
            }
            return onSendCaptcha?.(phone);
          }}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        注册
      </Button>
    </Form>
  );
};

export default PhoneRegisterForm;
