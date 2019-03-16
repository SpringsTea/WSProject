import { Component } from 'react';
import { Row, Col } from 'antd';

import DeckSearchStore from '../../stores/DeckSearchStore';

const buildState = () => ({
  pages: DeckSearchStore.getDecks(),
  serieses: DeckSearchStore.getSerieses(),
});

class User extends Component {

	state = {
		...buildState(),
		loading: false,
	}

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