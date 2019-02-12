import React, { Component } from 'react';
import { Row, Col } from 'antd';

import DeckStore from '../../stores/DeckStore';

import Card from '../Builder/Card';
import DeckDisplay from '../partials/DeckView/DeckDisplay';

const buildState = () => ({
  deck: DeckStore.getDeckData(),
  selectedCard: DeckStore.getSelectedCard(),
});

class DeckView extends Component {

  state = {
  	...buildState()
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    DeckStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DeckStore.removeChangeListener(this.onChange);
  }

	render(){
		const { deck, selectedCard } = this.state;

		return(
			<div className="container-deckview">
				<Row gutter={8}>
					<Col xxl={16} xl={14} lg={12} md={24}>
						<DeckDisplay deck={deck} />
					</Col>
					<Col xxl={6} xl={8} lg={10} md={24}>
						<Card data={selectedCard.card} />
					</Col>
				</Row>
			</div>
		)
	}
}

export default DeckView;