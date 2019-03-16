import { Component } from 'react';
import { Row, Col } from 'antd';

class User extends Component {

  render(){
  	const { username } = this.props;
    return(
      <div className="container-user">
        <Row>
          Howdy {username}
        </Row>
      </div>
    )
  }
}

export default User;