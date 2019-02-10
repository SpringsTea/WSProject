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

		console.log(selectedCard)

		return(
			<div className="container-deckview">
				<Row gutter={8}>
					<Col span={16}>
						<DeckDisplay deck={deck} />
					</Col>
					<Col span={6}>
						<Card data={selectedCard.card} />
					</Col>
				</Row>
			</div>
		)
	}
}

export default DeckView;