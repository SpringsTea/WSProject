import React, { Component } from 'react';
import { Row, Col } from 'antd';

import { filterCardQuantity } from 'Utils/cardfilter';

import CardItem from './CardItem';

class DeckDisplay extends Component {

	render(){
		const { deck } = this.props;
		const xxl = 4;
		const xl = 6;
		const lg = 8;
		const md = 8;
		const sm = 12;

		let cards = filterCardQuantity(deck.cards)

		return(
			<div className="container-deckdisplay">
				<div className="header">Level 0</div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.level === 0 && card.cardtype !== 'CX' ).map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
				<div className="header">Level 1 </div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.level === 1 ).map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
				<div className="header">Level 2</div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.level === 2 ).map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
				<div className="header">Level 3</div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.level === 3 ).map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
				<div className="header">Climaxes</div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.cardtype === 'CX' ).map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} key={i}>
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