import { Button } from 'antd';

import { ButtonProps } from 'antd/es/button';
import React from 'react';
import classNames from 'classnames';

interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = classNames('submit', className);
  return (
    <Button
      size="large"
      className={clsString}
      type="primary"
      htmlType="submit"
      {...rest}
    />
  );
};

export default LoginSubmit;
