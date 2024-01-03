import React, { Component } from 'react';
import { Row, Col } from 'antd';

class PageNotFound extends Component {

  render(){
    return(
      <div className="container-pagenotfound">
        <Row>
          <Col span={24}>
            <h1 style={{marginTop: '2em'}}>
              Page could not be found
            </h1>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PageNotFound;