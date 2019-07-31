import React, { Component } from 'react';
import { List } from 'antd';

import CardSelector from './CardSelector';
import CardSelectorV from './CardSelectorV';
import Header from '../partials/Builder/Deck/Header';

import { sortlevel } from 'Utils/cardsort';
import { filterCardQuantity } from 'Utils/cardfilter';

class Deck extends Component {

	state = { 
		visual: true,
	} 

	shouldComponentUpdate(nextProps, nextState){ 
		return this.props.cards.length !== nextProps.cards.length;
	} 

	render(){
		const { cards } = this.props;
		const { visual } = this.state;
		let deckcards = filterCardQuantity(cards);

		return(
			<div className="container-deck nice-scroll">
				<Header cards={cards}/>
				<div className="deck-body">
					<div>Characters</div>
						<div className={`CH card-category ${visual === true ? 'visual' : ''}`}>
							<CardSelectorV cards={deckcards.filter( (card) => card.cardtype === 'CH' ).sort(sortlevel) } quantity />
						</div>
					<div>Events</div>
						<div className={`EV card-category ${visual === true ? 'visual' : ''}`}>
							<CardSelectorV cards={deckcards.filter( (card) => card.cardtype === 'EV' ).sort(sortlevel)} quantity />
						</div>
					<div>Climaxes</div>
						<div className={`CX card-category ${visual === true ? 'visual' : ''}`}>
							<CardSelectorV cards={deckcards.filter( (card) => card.cardtype === 'CX' ).sort(sortlevel)} quantity />
						</div>
				</div>
			</div>
		)
	}
}

export default Deck;