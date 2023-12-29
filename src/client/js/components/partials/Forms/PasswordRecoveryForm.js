import { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { 
  MailOutlined
} from '@ant-design/icons';

import { passwordReset } from 'Utils/api';

const PasswordRecoveryForm = ({handleFormChange, logindata = {}}) => {

  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const ResetPassword = async(formdata) => {

    setLoading(true)
    setError(null)

    passwordReset(formdata).then((res) => {
      console.log(res)
      if( res.success === true ){
        message.success(res.message);
      }
      else{
        message.error(res.message || 'Something went wrong');
      }
    })
    .finally(() => {
      setLoading(false)
    })
        
    
  }


  return(

    <div className="container-password-recovery">
      <div className="mail-icon"><MailOutlined/></div>
        <Form 
          onFinish={ResetPassword} 
          className="password-recovery-form"
          initialValues={{
            username: logindata.email,
            password: logindata.password
          }}
        >
          <Form.Item
            name='email'
            label='Recovery Email'
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!'}, 
              { required: true, message: 'Please input your E-mail!'}
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Recover Password</Button>
          </Form.Item>
          <div>
            or <a onClick={() => handleFormChange('login')}>Login</a>
          </div>
      </Form>
    </div>
  )}

export default PasswordRecoveryForm;