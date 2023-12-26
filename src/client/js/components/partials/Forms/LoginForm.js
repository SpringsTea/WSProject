import { Component, useState } from 'react';
import {
  Form, Input, Button, Alert
} from 'antd';

import { 
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';

import { login } from 'Utils/api';

const LoginForm = ({handleFormChange, logindata}) => {

  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const HandleLogin = async(formdata) => {

    setLoading(true)
    setError(null)

    let res = await login(formdata)

    if(res.success === true){
      window.location = "/";
    }
    else{
      setError('Login was incorrect')
      setLoading(false)
    }  
    
  }


return(

  <Form 
    onFinish={HandleLogin} 
    className="login-form"
    initialValues={{
      username: logindata.email,
      password: logindata.password
    }}
  >
    {
      error &&
      <Alert message={error} type="warning" />
    }
    {
      logindata.message &&
      <Alert message={`${logindata.message}`} type="info" />
    }
    <Form.Item 
      name="username"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input.Password 
        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      <div>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Log in
        </Button>
      </div>
      Or <a onClick={() => handleFormChange('register')}>register now!</a>
    </Form.Item>
    <a className="login-form-forgot" onClick={() => handleFormChange('forgot')}>Forgot password</a>
  </Form>
)}

export default LoginForm;