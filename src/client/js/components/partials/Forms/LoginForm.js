import { Component } from 'react';
import {
  Form, Icon, Input, Button, Alert
} from 'antd';


import { login } from 'Utils/api';

class LoginForm extends Component {

  state = {
    loading:false,
    error: null,
  }

  handleSubmit = (e) => {
    const { login } = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values)
      }
    });
  }

  login = async(formdata) => {

    this.setState({loading: true, error: null});

    let res = await login(formdata)

    if(res.success === true){
      window.location = "/user";
    }
    else{
      console.log(res.message)
      this.setState({error: 'Login was incorrect'})
      this.setState({loading: false});
    }  
    
    
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { handleSubmit } = this;
    const { handleFormChange, logindata = {} } = this.props;
    const { loading, error } = this.state;
    return(
       <Form onSubmit={handleSubmit} className="login-form">
        {
          error &&
          <Alert message={error} type="warning" />
        }
        {
          logindata.message &&
          <Alert message={`${logindata.message}`} type="info" />
        }
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your email!' }],
            initialValue: logindata.email
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue: logindata.password
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
        </Form.Item>
        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Log in
            </Button>
          </div>
          Or <a onClick={() => handleFormChange('register')}>register now!</a>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'login' })(LoginForm);