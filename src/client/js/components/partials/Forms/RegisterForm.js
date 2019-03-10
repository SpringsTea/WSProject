import { Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox, Tooltip, Alert
} from 'antd';

import { register } from 'Utils/api';

class RegisterForm extends Component {

  state = {
    confirmDirty: false,
    loading: false,
  }

  handleSubmit = (e) => {
    const { register } = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        register(values)
      }
    });
  }

  register = async(formdata) => {
    const { handleFormChange  } = this.props;
    this.setState({loading: true});

    let res = await register(formdata)

    //Register successful
    if(res.success){
      this.setState({error: null})
      handleFormChange('login', { logindata: {...formdata, message:'Registration successful' }})
    }
    else{
      this.setState({error: res.response.data.message})
    }
    
    this.setState({loading: false});
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
    const { getFieldDecorator } = this.props.form;
    const { handleFormChange } = this.props;
    const { error, loading } = this.state;
    return(
       <Form onSubmit={this.handleSubmit}>
        {
          error &&
          <Alert message={error} type="warning" />
        }
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
            },
            {
              min: 6, message: 'Password must be atleast 6 charicters'
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
        <Form.Item
          label="User Name"
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Register</Button>
          <div>
            Already have an account? <a onClick={() => handleFormChange('login')}>Login</a>
          </div>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'register' })(RegisterForm);