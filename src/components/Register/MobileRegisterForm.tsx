import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { LockTwoTone, MobileTwoTone } from '@ant-design/icons';
import Password from 'antd/lib/input/Password';
import Captcha from '../Captcha';

interface MobileRegisterFormProps {
  initialValues?: any;
  onFinish?: (values: any) => void;
  onSendCaptcha?: () => Promise<void>;
}

const MobileRegisterForm: React.FC<MobileRegisterFormProps> = ({
  initialValues,
  onFinish,
  onSendCaptcha,
}) => {
  const [form] = useForm();

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.Item name="phone">
        <Input prefix={<MobileTwoTone />} />
      </Form.Item>
      <Form.Item name="password">
        <Password />
      </Form.Item>
      <Form.Item name="confirm">
        <Password prefix={<LockTwoTone />} />
      </Form.Item>
      <Form.Item name="code">
        <Captcha onSendCaptcha={onSendCaptcha} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        注册
      </Button>
    </Form>
  );
};

export default MobileRegisterForm;
