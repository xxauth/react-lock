import React from 'react';
import { Form, Button, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Password from 'antd/lib/input/Password';
import { LockTwoTone, MailTwoTone } from '@ant-design/icons';

interface EmailRegisterFormProps {
  initialValues?: any;
  onFinish?: (values: any) => void;
}

const EmailRegisterForm: React.FC<EmailRegisterFormProps> = ({
  initialValues,
  onFinish,
}) => {
  const [form] = useForm();
  return (
    <Form initialValues={initialValues} form={form} onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: '请输入邮箱' }]}
      >
        <Input size="large" prefix={<MailTwoTone />} placeholder="请输入邮箱" />
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
        <Password size="large" prefix={<LockTwoTone />} placeholder="请输入密码"/>
      </Form.Item>
      <Form.Item
        name="new_password"
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
              return Promise.reject(
                '必须和密码一致!',
              );
            },
          }),
        ]}
      >
        <Password size="large" prefix={<LockTwoTone />} placeholder="请输入确认密码" />
      </Form.Item>
      <Button
        style={{ width: '100%' }}
        size="large"
        type="primary"
        htmlType="submit"
      >
        注册
      </Button>
    </Form>
  );
};

export default EmailRegisterForm;
