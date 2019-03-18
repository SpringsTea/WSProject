import { Component } from 'react';
import { Input, Button, Icon, Form, message } from 'antd';

import { passwordReset } from 'Utils/api';

class PasswordRecoveryForm extends Component {

  state = {
    loading: false,
    error: false,
  }

  handleSubmit = (e) => {
    const { reset } = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        reset(values)
      }
    });
  }

  reset = async(formdata) => {

    this.setState({loading: true, error: null});

    let res = await passwordReset(formdata)

    if( res.success === true ){
      message.success(res.message);
    }
    else{
      message.error(res.message);
    }

    this.setState({loading: false});    
    
  }

  render(){
    const { handleSubmit } = this;
    const { handleFormChange } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return(
      <div className="container-password-recovery">
          <div className="mail-icon"><Icon type="mail" /></div>
          <Form onSubmit={handleSubmit} className="password-recovery-form">
            <Form.Item
            label='Recovery Email'
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
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Recover Password</Button>
            <div>
              or <a onClick={() => handleFormChange('login')}>Login</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'passwordrecovery' })(PasswordRecoveryForm);