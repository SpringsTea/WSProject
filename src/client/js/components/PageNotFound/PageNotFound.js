import React, { Component } from 'react';
import { Row, Col } from 'antd';

class PageNotFound extends Component {

  render(){
    return(
      <div className="container-pagenotfound">
        <Row>
          <Col span={24}>
            OH NO
          </Col>
        </Row>
      </div>
    )
  }
}

export default PageNotFound;