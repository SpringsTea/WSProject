import React, { Component } from 'react';
import { List, Radio } from 'antd';
import { 
  AppstoreOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import CardSelector from './CardSelector';
import CardSelectorV from './CardSelectorV';
import Header from '../partials/Builder/Deck/Header';

import { sortlevel } from 'Utils/cardsort';
import { filterCardQuantity } from 'Utils/cardfilter';

class Deck extends Component {

	state = { 
		selector: localStorage.getItem("encore-card-selector") || 'visual',
	} 

	shouldComponentUpdate(nextProps, nextState){ 
		return this.props.cards.length !== nextProps.cards.length || this.state.selector !== nextState.selector;
	} 

	switchSelectorType = (value) => {

		localStorage.setItem('encore-card-selector', value);
		this.setState({selector: value});
	}

	render(){
		const { switchSelectorType } = this;
		const { cards } = this.props;
		const { selector } = this.state;
		let deckcards = filterCardQuantity(cards);

		const SelectorComponent = selector === 'visual' ? CardSelectorV : CardSelector;

		return(
			<div className="container-deck nice-scroll">
				<Header cards={cards}/>
				<Radio.Group className="selector-control" size='small' defaultValue={selector} 
				onChange={ (e) => switchSelectorType(e.target.value) }>
					<Radio.Button value="visual">
						<AppstoreOutlined />
					</Radio.Button>
					<Radio.Button value="list">
						<MenuOutlined />
					</Radio.Button>
				</Radio.Group>
				<div className="deck-body">
					<div>Characters</div>
						<div className={`CH card-category ${selector}`}>
							<SelectorComponent cards={deckcards.filter( (card) => card.cardtype === 'CH' ).sort(sortlevel) } quantity />
						</div>
					<div>Events</div>
						<div className={`EV card-category ${selector}`}>
							<SelectorComponent cards={deckcards.filter( (card) => card.cardtype === 'EV' ).sort(sortlevel)} quantity />
						</div>
					<div>Climaxes</div>
						<div className={`CX card-category ${selector}`}>
							<SelectorComponent cards={deckcards.filter( (card) => card.cardtype === 'CX' ).sort(sortlevel)} quantity />
						</div>
				</div>
			</div>
		)
	}
}

export default Deck;