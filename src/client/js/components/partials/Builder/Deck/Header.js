import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

class Header extends Component {

	sumCardQuantity(cards, type ='CH'){
		return cards.filter( (card) => card.cardtype === type).length;
	}

	countCardLevel(cards, level = 0){
		return cards.filter( (card) => card.level === level && card.cardtype !== 'CX' ).length;
	}

	render(){
		const { sumCardQuantity, countCardLevel } = this;
		const { cards } = this.props;

		return(
			<Card className="deck-header">
				<div>
					<span>
						Cards : { cards.length }
					</span>
					<span>
						Characters : { sumCardQuantity(cards, 'CH') }
					</span>
					<span>
						Events : { sumCardQuantity(cards, 'EV') }
					</span>
					<span>
						Climaxes : { sumCardQuantity(cards, 'CX') }
					</span>
				</div>

				<div>
					{
						[0,1,2,3].map( (level) => <span key={level}> Level {level} : { countCardLevel(cards, level) } </span> )
					}
				</div>
			</Card>
		)
	}
}

export default Header;