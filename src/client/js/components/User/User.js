import { Component } from 'react';
import { Row, Col, Layout, Menu } from 'antd';

import DeckListDisplay from '../DeckSearch/DeckListDisplay';

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

	handleLoading = (val) => this.setState({loading:val})

	render(){
		const { handleLoading } = this;
		const { username } = this.props;
		const { loading, pages } = this.state;
		return(
			<div className="container-user">
				<Row>
					<DeckListDisplay pages={pages} setLoading={handleLoading} loading={loading} />
				</Row>
			</div>
		)
	}
}

export default User;