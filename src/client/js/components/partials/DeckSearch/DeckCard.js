import React, { Component } from 'react';
import { Card, Avatar, Icon } from 'antd';
import Img from 'react-image';

import { generateCardImageLink } from 'Utils/cardshorthands';

const { Meta } = Card;

const DeckTitle = ({ name, user = 'Anonymous', deckid }) => 
<div className="title">
	<div className="deckname"><a href={`/deck/${deckid}`} title={name}>{ name }</a></div>
	<div> <a className="user">{ user }</a></div>
</div>;

class DeckCard extends Component {
	render(){
		const { deck } = this.props; 
		return(
			<div className="container-deckcard">
				<Card
					cover={
						<div className="deck-image">
							<Img
							src={[
							  generateCardImageLink(deck.cards[0]),
							]}
							unloader={<Icon className="image-not-found" type="question-circle" />}
							/>
						</div>
					}
				>
					<Meta 
						title={DeckTitle(deck)} 
						description={deck.description}
					/>
				</Card>
			</div>
		)
	}
}

export default DeckCard;