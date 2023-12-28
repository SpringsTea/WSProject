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

/*
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

  checkCharicters = (rule, value, callback) => {
    let invalidchars = /^[^\\\/& #%{}\?\[\]]*$/

    if( value.match(invalidchars) ){
      callback();
    }
    else{
      callback("Username can not contain slashes, spaces, or other special characters")
    }
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
    const { checkCharicters } = this;
    const { getFieldDecorator } = this.props.form;
    const { handleFormChange } = this.props;
    const { error, loading } = this.state;
    return(
       <Form onSubmit={this.handleSubmit} name="register">
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
        <Form.Item
          label="User Name"
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true },
                    { validator: checkCharicters }
            ],
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

export default RegisterForm;
*/