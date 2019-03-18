import { Component } from 'react';
import { Input, Button, Icon, Form, message } from 'antd';

import { passwordReset } from 'Utils/api';

class PasswordChangeForm extends Component {

  state = {
    loading: false,
    error: false,
  }

  passwordChange = async(password) =>{
    const { token } = this.props;
    this.setState({loading: true});

    let res = await passwordReset({token:token, password: password})
    if( res.success === true){
      window.location = '/login';
    }
    else{
      message.error(res.message);
    }
    this.setState({loading: false})
  }

  handleSubmit = (e) => {
    const { passwordChange } = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        passwordChange(values.password)
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords do not match');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render(){
    const { handleSubmit } = this;
    const { handleFormChange } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return(
      <div className="container-password-change">
        <Form onSubmit={handleSubmit}>
          <Form.Item
          label="Password"
          >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            },
            {
              min: 6, message: 'Password must be atleast 6 characters'
            }
            , {
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Change my password</Button>
        </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'passwordchange' })(PasswordChangeForm);