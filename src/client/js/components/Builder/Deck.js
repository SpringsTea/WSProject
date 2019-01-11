import React, { Component } from 'react';
import { List } from 'antd';

import CardSelector from './CardSelector';

class Deck extends Component {

	handleItemHover = (card) =>{
		const { ViewCard } = this.props;
		ViewCard(card);
	}

	calculateCardQuantity = () =>{
		const { cards } = this.props;

		//Removes duplicate cards, giving each unique card a quantity instead
		return cards.reduce( (a,b) => {
		    var i = a.findIndex( x => x.id === b.id);
		    return i === -1 ? a.push({ ...b, quantity : 1 }) : a[i].quantity++, a;
		}, []);
	}

	render(){
		const { handleItemHover, calculateCardQuantity } = this;
		const { cards } = this.props;

		//TODO This componenet renders on cardView, which call this logic way too often
		let deckcards = calculateCardQuantity();

		return(
			<div className="container-deck">
				<div className="deck-header">
					{ cards.length }
				</div>
				<div className="deck-body">
					<div>Charicters</div>
						<div>
							<CardSelector ViewCard={handleItemHover} cards={deckcards.filter( (card) => card.type === 'Charicter' )} />
						</div>
					<div>Events</div>
						<div>
							<CardSelector ViewCard={handleItemHover} cards={deckcards.filter( (card) => card.type === 'Event' )} />
						</div>
					<div>Climaxes</div>
						<div>
							<CardSelector ViewCard={handleItemHover} cards={deckcards.filter( (card) => card.type === 'Climax' )} />
						</div>
				</div>
			</div>
		)
	}
}

export default Deck;