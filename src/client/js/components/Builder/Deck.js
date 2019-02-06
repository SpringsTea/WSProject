import React, { Component } from 'react';
import { List } from 'antd';

import CardSelector from './CardSelector';
import Header from '../partials/Builder/Deck/Header';

import { sortlevel } from '../../utils/cardsort';

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

		let deckcards = calculateCardQuantity();

		return(
			<div className="container-deck nice-scroll">
				<Header cards={cards}/>
				<div className="deck-body">
					<div>Charicters</div>
						<div className="CH card-category">
							<CardSelector cards={deckcards.filter( (card) => card.cardtype === 'CH' ).sort(sortlevel) } />
						</div>
					<div>Events</div>
						<div className="EV card-category">
							<CardSelector cards={deckcards.filter( (card) => card.cardtype === 'EV' ).sort(sortlevel)} />
						</div>
					<div>Climaxes</div>
						<div className="CX card-category">
							<CardSelector cards={deckcards.filter( (card) => card.cardtype === 'CX' ).sort(sortlevel)} />
						</div>
				</div>
			</div>
		)
	}
}

export default Deck;