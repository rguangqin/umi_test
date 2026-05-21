import services from '@/services/demo';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { history } from 'umi';
const { login } = services.UserController;

const onFinish: FormProps<API.FieldType>['onFinish'] = async (values) => {
  console.log('Success:', values);
  const { data, code } = (await login({ ...values })) || {};
  localStorage.setItem('userInfo', data?.list);
  if (code === 200) {
    history.push({
      pathname: '/Home',
    });
  }
  console.log(data);
};

const onFinishFailed: FormProps<API.FieldType>['onFinishFailed'] = (
  errorInfo,
) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<API.FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<API.FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        登录
      </Button>
    </Form.Item>
  </Form>
);

export default Login;
