import { Button } from 'antd';

import { ButtonProps } from 'antd/es/button';
import React from 'react';

interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({ className, ...rest }) => {
  return (
    <Button
      size="large"
      className={`submit ${className}`}
      type="primary"
      htmlType="submit"
      {...rest}
    />
  );
};

export default LoginSubmit;
