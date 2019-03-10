import { Component } from 'react';
import { Row, Col } from 'antd';

import LoginForm from 'Partials/Forms/LoginForm'

class Login extends Component {

  render(){
    return(
      <div className="container-login">
      	<div className="container-login-form">
        	<LoginForm />
        </div>
      </div>
    )
  }
}

export default Login;