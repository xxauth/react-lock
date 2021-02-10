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
      <Form.Item name="email">
        <Input size="large" prefix={<MailTwoTone />} />
      </Form.Item>
      <Form.Item name="password">
        <Password size="large" prefix={<LockTwoTone />} />
      </Form.Item>
      <Form.Item>
        <Password size="large" prefix={<LockTwoTone />} />
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
