import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { useCountDown } from 'ahooks';
import { MailTwoTone } from '@ant-design/icons';

interface CaptchaProps {
  value?: string;
  onChange?: (value) => void;
  onSendCaptcha: () => Promise<void>;
}

const Captcha: React.FC<CaptchaProps> = ({
  value,
  onChange,
  onSendCaptcha,
}) => {
  const [countdown, setTargetDate] = useCountDown();

  const handleSendCaptcha = async () => {
    try {
      await onSendCaptcha();
      setTargetDate(Date.now() + 60000);
    } catch (e) {}
  };

  return (
    <Row gutter={12}>
      <Col span={16}>
        <Input
          size="large"
          prefix={<MailTwoTone />}
          placeholder="请输入验证码"
          value={value}
          onChange={onChange}
        />
      </Col>
      <Col span={8}>
        <Button
          size="large"
          disabled={countdown > 0}
          onClick={handleSendCaptcha}
        >
          {countdown > 0
            ? `等待${Math.round(countdown / 1000)}s`
            : '发送验证码'}
        </Button>
      </Col>
    </Row>
  );
};

export default Captcha;
