import { Component } from 'react';
import { Row, Col, Layout, Menu } from 'antd';

import DeckFilters from '../DeckSearch/DeckFilters';
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

	onChange = () => this.setState(buildState);

	componentDidMount() {
		DeckSearchStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		DeckSearchStore.removeChangeListener(this.onChange);
	}

	handleLoading = (val) => this.setState({loading:val})

	render(){
		const { handleLoading } = this;
		const { username } = this.props;
		const { loading, pages, serieses } = this.state;
		return(
			<div className="container-user">
				<Row>
					<h2>{username}s Decks</h2>
				</Row>
				<Row>
					<DeckFilters serieses={serieses} setLoading={handleLoading} filters={ {username: username }} />
					<DeckListDisplay pages={pages} setLoading={handleLoading} loading={loading} />
				</Row>
			</div>
		)
	}
}

export default User;