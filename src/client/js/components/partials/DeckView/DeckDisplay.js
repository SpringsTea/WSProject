import React, { Component } from 'react';
import { Row, Col } from 'antd';

import { filterCardQuantity } from 'Utils/cardfilter';

import CardItem from './CardItem';

class DeckDisplay extends Component {

	render(){
		const { deck } = this.props;

		let cards = filterCardQuantity(deck.cards)

		return(
			<div className="container-deckdisplay">
				<Row gutter={8}>
					{
						cards.map( (card, i) => 
						<Col span={4} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
			</div>
		)
	}
}

export default DeckDisplay;