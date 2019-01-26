import React, { Component } from 'react';
import { List } from 'antd';

import CardSelector from './CardSelector';
import Header from '../partials/Builder/Deck/Header';

class Deck extends Component {

	state = { 
		decksize: 0 
	} 
 
	shouldComponentUpdate(nextProps){ 
		return this.state.decksize !== nextProps.cards.length; 
	} 

	handleItemHover = (card) =>{
		const { ViewCard } = this.props;
		ViewCard(card);
	}

	calculateCardQuantity = () =>{
		const { cards } = this.props;

		this.setState({ decksize: cards.length }) 

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
		console.log('Deck Render'); 

		return(
			<div className="container-deck">
				<Header cards={cards}/>
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