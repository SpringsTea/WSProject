import React, { Component } from 'react';
import { List } from 'antd';

import { getLocale } from 'Utils/cardlocale';
import CardItem from '../partials/Builder/CardItem/CardItem';

class CardSelector extends Component {

	//I didn't actually fix this, the list still renders very often. But I'm trying it out, it dosnt seem to be too bad
	// shouldComponentUpdate(nextProps){
	// 	//TODO I should not have to do this, why does this component render on card select
	// 	if( (nextProps.cards.length === this.props.cards.length && this.props.quantity !== true) ){
	// 		return true;
	// 	}

	// 	return true;
	// }
	render(){
		const { cards, controls, isMobile } = this.props;
		return(
			<div className={`container-card-selector ${ isMobile ? 'tall' : '' }`}>
				<List
					dataSource={cards}
					locale={ { emptyText: 'No Cards' } }
					renderItem={ card => <CardItem card={card} controls={controls} locale={getLocale(card)} /> }
				/>
			</div>
		)
	}
}

export default CardSelector;