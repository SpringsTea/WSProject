import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Login extends Component {

  render(){
    return(
      <div className="container-login">
        <Row>
          <Col span={24}>
            Login
          </Col>
        </Row>
      </div>
    )
  }
}

export default Login;