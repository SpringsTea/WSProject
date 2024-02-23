import { useState } from 'react';
import { Input, Button, Form, message } from 'antd';

import { passwordReset } from 'Utils/api';

const PasswordChangeForm = ({token}) => {

  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ confirmDirty, setConfirmDirty ] = useState(null);

   const [form] = Form.useForm();

  const passwordChange = async(password) =>{
    setLoading(true)

    let res = await passwordReset({token:token, password: password})
    if( res.success === true){
      window.location = '/login';
    }
    else{
      message.error(res.message);
    }
    tsetLoading(false)
  }

  const handleSubmit = (values) => {
    passwordChange(values.password)
  }

  return(
    <div className="container-password-change">
      <Form onFinish={handleSubmit} name="passwordchange">
        <Form.Item
        name='password'
        label="Password"
        rules={[{
            required: true, message: 'Please input your password!',
          },
          {
            min: 6, message: 'Password must be atleast 6 characters'
          }
        ]}
        >
          <Input type="password" />
      </Form.Item>
      <Form.Item
        name='confirm'
        label="Confirm Password"
        rules={[{
            required: true, message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Change my password</Button>
      </Form.Item>
      </Form>
    </div>
  )
}

export default PasswordChangeForm;