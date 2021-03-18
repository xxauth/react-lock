import { Tabs, Form } from 'antd';
import React, { useState } from 'react';
import useMergeValue from 'use-merge-value';
import { FormInstance } from 'antd/es/form';

import LoginContext from './LoginContext';
import LoginItem, { LoginItemProps } from './LoginItem';
import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';

export interface LoginProps {
  activeKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (values) => void;
  className?: string;
  form?: FormInstance;
  children: React.ReactElement<typeof LoginTab>[];
}

interface LoginType extends React.FC<LoginProps> {
  Tab: typeof LoginTab;
  Submit: typeof LoginSubmit;
  Username: React.FunctionComponent<LoginItemProps>;
  Password: React.FunctionComponent<LoginItemProps>;
  Mobile: React.FunctionComponent<LoginItemProps>;
  Captcha: React.FunctionComponent<LoginItemProps>;
}

const Login: LoginType = ({
  activeKey,
  onTabChange,
  className,
  form: _form,
  children,
  onSubmit,
}) => {
  const [form] = Form.useForm(_form);
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState({});
  const [tabActiveType, setType] = useMergeValue('', {
    value: activeKey,
    onChange: onTabChange,
  });
  const TabChildren: React.ReactComponentElement<typeof LoginTab>[] = [];
  const otherChildren: React.ReactElement<unknown>[] = [];
  React.Children.forEach(
    children,
    (
      child:
        | React.ReactComponentElement<typeof LoginTab>
        | React.ReactElement<unknown>,
    ) => {
      if (!child) {
        return;
      }
      if ((child.type as { typeName: string }).typeName === 'LoginTab') {
        TabChildren.push(child as React.ReactComponentElement<typeof LoginTab>);
      } else {
        otherChildren.push(child);
      }
    },
  );
  return (
    <LoginContext.Provider
      value={{
        tabUtil: {
          addTab: id => {
            setTabs([...tabs, id]);
          },
          removeTab: id => {
            setTabs(tabs.filter(currentId => currentId !== id));
          },
        },
        updateActive: activeItem => {
          if (!active) return;
          if (active[tabActiveType]) {
            active[tabActiveType].push(activeItem);
          } else {
            active[tabActiveType] = [activeItem];
          }
          setActive(active);
        },
      }}
    >
      <Form
        form={form}
        onFinish={values => {
          onSubmit?.(values);
        }}
        validateTrigger="onSubmit"
        className={className}
      >
        {tabs.length ? (
          <>
            <Tabs
              destroyInactiveTabPane
              animated={false}
              className="tabs"
              activeKey={tabActiveType}
              onChange={activeKey => {
                setType(activeKey);
              }}
            >
              {TabChildren}
            </Tabs>
            {otherChildren}
          </>
        ) : (
          children
        )}
      </Form>
    </LoginContext.Provider>
  );
};

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Login.Username = LoginItem.Username;
Login.Password = LoginItem.Password;
Login.Mobile = LoginItem.Mobile;
Login.Captcha = LoginItem.Captcha;

export default Login;
