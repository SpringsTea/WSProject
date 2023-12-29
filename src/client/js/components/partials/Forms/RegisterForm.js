import { useState } from 'react';
import {
  Form, Input, Button, Checkbox, Tooltip, Alert
} from 'antd';

import { 
  QuestionCircleOutlined,
  LockOutlined,
} from '@ant-design/icons';

import { register } from 'Utils/api';

const RegisterForm = ({handleFormChange}) => {

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const Register = (formdata) => {
    
    setLoading(true)
    setError(null)

    register(formdata)
    .then((res) => {
      console.log(res)
      //Register successful
      if(res.success){
        handleFormChange('login', { logindata: {...formdata, message:'Registration successful' }})
      }
      else{
        setError(res.response.data.message || 'Something went wrong with registration')
      }
    })
    .finally(() => {
      setLoading(false)
    })

  }

  return(

    <Form 
      onFinish={Register} 
      className="register-form"
    >
        {
          error &&
          <Alert message={error} type="warning" />
        }
        <Form.Item
          name='email'
          label={(
            <span>
              Email&nbsp;
              <Tooltip title="Your email will never be displayed to others">
                <QuestionCircleOutlined/>
              </Tooltip>
            </span>
          )}
          rules={
            [
              { type: 'email', message: 'The input is not valid E-mail!' }, 
              { required: true, message: 'Please input your E-mail!' }
            ]
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name='password'
          rules={
            [
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be atleast 6 characters' }
            ]
          }
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name='confirm'
          dependencies={['password']}
          rules={
            [
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]
          }
        >
            <Input type="password" />
        </Form.Item>
        <Form.Item
          label="User Name"
          name="username"
          rules={
            [
              { required: true, message: 'Please input your username!', whitespace: true },
              //{ validator: checkCharicters }
            ]
          }
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Register</Button>
          <div>
            Already have an account? <a onClick={() => handleFormChange('login')}>Login</a>
          </div>
        </Form.Item>
      </Form>
  )}

export default RegisterForm;