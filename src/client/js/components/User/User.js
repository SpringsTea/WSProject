import { Component } from 'react';
import { Row, Col, Layout, Menu } from 'antd';

import DeckSearch from '../DeckSearch/DeckSearch';

class User extends Component {

	state = {

	}

	render(){
		const { username, filters, loggedin } = this.props;
		return(
			<div className="container-user">
				<Row>
					<h2>{username}s Decks</h2>
				</Row>
				<Row>
					<DeckSearch loggedin={loggedin} filters={{username: username, invalid: true, ...filters}} />
				</Row>
			</div>
		)
	}
}

export default User;