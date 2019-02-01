import React, { Component } from 'react';
import { List } from 'antd';

import CardSelector from './CardSelector';
import Header from '../partials/Builder/Deck/Header';

class Deck extends Component {

	state = { 
		decksize: 0 
	} 

	shouldComponentUpdate(nextProps, nextState){ 
		return this.props.cards.length !== nextProps.cards.length;
	} 

	calculateCardQuantity = () =>{
		const { cards } = this.props;

		//Removes duplicate cards, giving each unique card a quantity instead
		return cards.reduce( (a,b) => {
		    var i = a.findIndex( x => x._id === b._id);
		    return i === -1 ? a.push({ ...b, quantity : 1 }) : a[i].quantity++, a;
		}, []);
	}

	render(){
		const { calculateCardQuantity } = this;
		const { cards } = this.props;
		console.log('render deck')
		//TODO This componenet renders on cardView, which call this logic way too often
		let deckcards = calculateCardQuantity();

		return(
			<div className="container-deck">
				<Header cards={cards}/>
				<div className="deck-body">
					<div>Charicters</div>
						<div>
							<CardSelector cards={deckcards.filter( (card) => card.cardtype === 'CH' )} />
						</div>
					<div>Events</div>
						<div>
							<CardSelector cards={deckcards.filter( (card) => card.cardtype === 'EV' )} />
						</div>
					<div>Climaxes</div>
						<div>
							<CardSelector cards={deckcards.filter( (card) => card.cardtype === 'CX' )} />
						</div>
				</div>
			</div>
		)
	}
}

export default Deck;