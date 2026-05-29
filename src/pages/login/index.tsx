import services from '@/services/demo';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { history } from 'umi';
const { login, menuList } = services.UserController;

const onFinish: FormProps<API.FieldType>['onFinish'] = async (values) => {
  const { data = {}, code } = (await login({ ...values })) || {};
  localStorage.setItem('userInfo', JSON.stringify(data));
  if (code === 200) {
    // 获取菜单
    const { data } = await menuList();
    console.log(data);
    history.push({
      pathname: '/Home',
    });
  }
};

const Login: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
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
