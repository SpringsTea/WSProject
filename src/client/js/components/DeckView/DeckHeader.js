import React, { Component } from 'react';
import { Card, Row, Col, Tag } from 'antd';

class DeckHeader extends Component {

	sumCardQuantity(cards, type ='CH'){
		return cards.filter( (card) => card.cardtype === type).length;
	}

	countCardLevel(cards, level = 0){
		return cards.filter( (card) => card.level === level && card.cardtype !== 'CX' ).length;
	}

	render(){
		const { sumCardQuantity, countCardLevel } = this;
		const { cards, deck } = this.props;

		return(
			<Card className="deck-header">
				<div>
					<h2>{deck.name}</h2>
				</div>
				<Row gutter={6}>
					<Col xl={6} className="display">
						<div>
							<span>
								Characters : { sumCardQuantity(cards, 'CH') } {' '}
							</span>
							<span>
								Events : { sumCardQuantity(cards, 'EV') } {' '}
							</span>
							<span>
								Climaxes : { sumCardQuantity(cards, 'CX') }
							</span>
						</div>
						<div>
							(
							{
								[0,1,2,3].map( (level) => <span key={level}> Level {level}: { countCardLevel(cards, level) }{level !== 3 && ','} </span> )
							}
							)
						</div>
					</Col>
					<Col xl={12} className="display">
						Description: 
						<div className="deck-description">
						{ deck.description }
						</div>
					</Col>
					<Col className="display">
						Sets: { deck.sets.map( (set) => <Tag>{set}</Tag> ) }
					</Col>
				</Row>
			</Card>
		)
	}
}

export default DeckHeader;