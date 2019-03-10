import { Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox, Tooltip, Alert
} from 'antd';

class RegisterForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { handleFormChange } = this.props;
    return(
       <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label={(
            <span>
              Email&nbsp;
              <Tooltip title="Your email will never be displayed to others">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          label="User Name"
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Register</Button>
          <div>
            Already have an account? <a onClick={() => handleFormChange('login')}>Login</a>
          </div>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'register' })(RegisterForm);