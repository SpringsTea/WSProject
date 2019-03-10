import { Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';


import { login } from 'Utils/api';

class LoginForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login(values)
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
       <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
        </Form.Item>
        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </div>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'login' })(LoginForm);